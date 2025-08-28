import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

// CORS configuration
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://skillswap.figma.app'],
  credentials: true,
}))

// Logging
app.use('*', logger(console.log))

// Supabase client for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Auth middleware for protected routes
async function requireAuth(c: any, next: any) {
  const accessToken = c.req.header('Authorization')?.split(' ')[1]
  if (!accessToken) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401)
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)
    if (error || !user) {
      console.log('Auth error:', error)
      return c.json({ error: 'Unauthorized - Invalid token' }, 401)
    }
    c.set('user', user)
    await next()
  } catch (error) {
    console.log('Auth middleware error:', error)
    return c.json({ error: 'Unauthorized - Auth check failed' }, 401)
  }
}

// Health check
app.get('/make-server-27bc4a45/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// User Authentication Routes
app.post('/make-server-27bc4a45/auth/signup', async (c) => {
  try {
    const { email, password, name, dateOfBirth } = await c.req.json()
    
    // Basic validation
    if (!email || !password || !name || !dateOfBirth) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    // Age verification (18+)
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    if (age < 18) {
      return c.json({ error: 'Must be 18 or older to join SkillSwap' }, 400)
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name,
        dateOfBirth,
        joinedAt: new Date().toISOString(),
        profileCompleted: false
      },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    })

    if (error) {
      console.log('Signup error:', error)
      return c.json({ error: `Failed to create user: ${error.message}` }, 400)
    }

    // Initialize user profile in KV store
    const userProfile = {
      id: data.user.id,
      email,
      name,
      dateOfBirth,
      joinedAt: new Date().toISOString(),
      profileCompleted: false,
      subscriptionTier: 'trial',
      trialStartDate: new Date().toISOString(),
      skills: [],
      interests: [],
      completedSessions: 0,
      totalMinutes: 0,
      rating: 0,
      reviewCount: 0,
      lastActive: new Date().toISOString()
    }

    await kv.set(`user:${data.user.id}`, userProfile)
    
    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email,
        name
      }
    })
  } catch (error) {
    console.log('Signup route error:', error)
    return c.json({ error: 'Internal server error during signup' }, 500)
  }
})

// User Profile Management
app.get('/make-server-27bc4a45/user/profile', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const profile = await kv.get(`user:${user.id}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    return c.json({ profile })
  } catch (error) {
    console.log('Get profile error:', error)
    return c.json({ error: 'Failed to fetch profile' }, 500)
  }
})

app.put('/make-server-27bc4a45/user/profile', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const updates = await c.req.json()
    
    const currentProfile = await kv.get(`user:${user.id}`)
    if (!currentProfile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    const updatedProfile = {
      ...currentProfile,
      ...updates,
      lastActive: new Date().toISOString()
    }

    await kv.set(`user:${user.id}`, updatedProfile)
    
    return c.json({ profile: updatedProfile })
  } catch (error) {
    console.log('Update profile error:', error)
    return c.json({ error: 'Failed to update profile' }, 500)
  }
})

// Skills Management
app.post('/make-server-27bc4a45/user/skills', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { skills, interests } = await c.req.json()
    
    const profile = await kv.get(`user:${user.id}`)
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    profile.skills = skills || []
    profile.interests = interests || []
    profile.profileCompleted = true
    profile.lastActive = new Date().toISOString()

    await kv.set(`user:${user.id}`, profile)
    
    return c.json({ success: true, profile })
  } catch (error) {
    console.log('Skills update error:', error)
    return c.json({ error: 'Failed to update skills' }, 500)
  }
})

// Skill Discovery & Search
app.get('/make-server-27bc4a45/skills/search', requireAuth, async (c) => {
  try {
    const query = c.req.query('q') || ''
    const category = c.req.query('category') || ''
    
    // Get all user profiles to search through skills
    const userProfiles = await kv.getByPrefix('user:')
    
    const availableSkills = userProfiles
      .filter(profile => {
        if (!profile.skills || profile.skills.length === 0) return false
        if (!profile.profileCompleted) return false
        
        // Filter by category if specified
        if (category) {
          const hasCategory = profile.skills.some(skill => 
            skill.category?.toLowerCase().includes(category.toLowerCase())
          )
          if (!hasCategory) return false
        }
        
        // Filter by search query if specified
        if (query) {
          const matchesQuery = profile.skills.some(skill => 
            skill.name?.toLowerCase().includes(query.toLowerCase()) ||
            skill.description?.toLowerCase().includes(query.toLowerCase())
          )
          if (!matchesQuery) return false
        }
        
        return true
      })
      .map(profile => ({
        userId: profile.id,
        name: profile.name,
        skills: profile.skills,
        rating: profile.rating || 0,
        reviewCount: profile.reviewCount || 0,
        completedSessions: profile.completedSessions || 0
      }))
    
    return c.json({ skills: availableSkills })
  } catch (error) {
    console.log('Skills search error:', error)
    return c.json({ error: 'Failed to search skills' }, 500)
  }
})

// Subscription Management
app.get('/make-server-27bc4a45/subscription/status', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const profile = await kv.get(`user:${user.id}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    // Calculate trial status
    const trialStart = new Date(profile.trialStartDate || profile.joinedAt)
    const trialEnd = new Date(trialStart.getTime() + (7 * 24 * 60 * 60 * 1000)) // 7 days
    const now = new Date()
    const isTrialActive = now < trialEnd

    const subscriptionStatus = {
      tier: profile.subscriptionTier || 'trial',
      isTrialActive,
      trialEnd: trialEnd.toISOString(),
      daysRemaining: isTrialActive ? Math.ceil((trialEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)) : 0,
      limits: getSubscriptionLimits(profile.subscriptionTier || 'trial'),
      usage: {
        dailyRequests: profile.dailyRequests || 0,
        dailyConnections: profile.dailyConnections || 0,
        totalMinutes: profile.totalMinutes || 0
      }
    }

    return c.json({ subscription: subscriptionStatus })
  } catch (error) {
    console.log('Subscription status error:', error)
    return c.json({ error: 'Failed to get subscription status' }, 500)
  }
})

app.post('/make-server-27bc4a45/subscription/upgrade', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { tier } = await c.req.json()
    
    // Validate tier
    const validTiers = ['basic', 'standard', 'pro']
    if (!validTiers.includes(tier)) {
      return c.json({ error: 'Invalid subscription tier' }, 400)
    }

    const profile = await kv.get(`user:${user.id}`)
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    // In a real app, this would integrate with Stripe/payment processor
    profile.subscriptionTier = tier
    profile.subscriptionStartDate = new Date().toISOString()
    profile.lastActive = new Date().toISOString()

    await kv.set(`user:${user.id}`, profile)
    
    return c.json({ 
      success: true, 
      subscription: {
        tier,
        limits: getSubscriptionLimits(tier)
      }
    })
  } catch (error) {
    console.log('Subscription upgrade error:', error)
    return c.json({ error: 'Failed to upgrade subscription' }, 500)
  }
})

// Session Booking
app.post('/make-server-27bc4a45/sessions/request', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { teacherId, skillId, message, preferredTime } = await c.req.json()
    
    // Validate request
    if (!teacherId || !skillId) {
      return c.json({ error: 'Teacher ID and Skill ID are required' }, 400)
    }

    // Check user's daily request limit
    const profile = await kv.get(`user:${user.id}`)
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    const limits = getSubscriptionLimits(profile.subscriptionTier || 'trial')
    if ((profile.dailyRequests || 0) >= limits.dailyRequests) {
      return c.json({ error: 'Daily request limit reached' }, 429)
    }

    // Create session request
    const sessionRequest = {
      id: crypto.randomUUID(),
      studentId: user.id,
      teacherId,
      skillId,
      message: message || '',
      preferredTime: preferredTime || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString() // 24 hours
    }

    await kv.set(`session-request:${sessionRequest.id}`, sessionRequest)
    
    // Update user's daily request count
    profile.dailyRequests = (profile.dailyRequests || 0) + 1
    profile.lastActive = new Date().toISOString()
    await kv.set(`user:${user.id}`, profile)

    return c.json({ success: true, sessionRequest })
  } catch (error) {
    console.log('Session request error:', error)
    return c.json({ error: 'Failed to create session request' }, 500)
  }
})

app.get('/make-server-27bc4a45/sessions/requests', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const type = c.req.query('type') || 'received' // 'sent' or 'received'
    
    const allRequests = await kv.getByPrefix('session-request:')
    
    const userRequests = allRequests.filter(request => {
      if (type === 'sent') {
        return request.studentId === user.id
      } else {
        return request.teacherId === user.id
      }
    })

    return c.json({ requests: userRequests })
  } catch (error) {
    console.log('Get session requests error:', error)
    return c.json({ error: 'Failed to get session requests' }, 500)
  }
})

app.post('/make-server-27bc4a45/sessions/respond', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { requestId, action, scheduledTime } = await c.req.json()
    
    // Validate action
    if (!['accept', 'decline'].includes(action)) {
      return c.json({ error: 'Invalid action' }, 400)
    }

    const sessionRequest = await kv.get(`session-request:${requestId}`)
    if (!sessionRequest) {
      return c.json({ error: 'Session request not found' }, 404)
    }

    // Verify user is the teacher
    if (sessionRequest.teacherId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403)
    }

    if (action === 'accept') {
      // Create actual session
      const session = {
        id: crypto.randomUUID(),
        studentId: sessionRequest.studentId,
        teacherId: sessionRequest.teacherId,
        skillId: sessionRequest.skillId,
        scheduledTime: scheduledTime || new Date().toISOString(),
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        duration: 30, // Default 30 minutes
        studentTime: 0,
        teacherTime: 0
      }

      await kv.set(`session:${session.id}`, session)
      
      // Update request status
      sessionRequest.status = 'accepted'
      sessionRequest.sessionId = session.id
      await kv.set(`session-request:${requestId}`, sessionRequest)

      return c.json({ success: true, session })
    } else {
      // Decline request
      sessionRequest.status = 'declined'
      await kv.set(`session-request:${requestId}`, sessionRequest)

      return c.json({ success: true, message: 'Session request declined' })
    }
  } catch (error) {
    console.log('Session response error:', error)
    return c.json({ error: 'Failed to respond to session request' }, 500)
  }
})

// Active Sessions
app.get('/make-server-27bc4a45/sessions/active', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    
    const allSessions = await kv.getByPrefix('session:')
    const userSessions = allSessions.filter(session => 
      (session.studentId === user.id || session.teacherId === user.id) &&
      ['scheduled', 'active'].includes(session.status)
    )

    return c.json({ sessions: userSessions })
  } catch (error) {
    console.log('Get active sessions error:', error)
    return c.json({ error: 'Failed to get active sessions' }, 500)
  }
})

app.post('/make-server-27bc4a45/sessions/:sessionId/start', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const sessionId = c.req.param('sessionId')
    
    const session = await kv.get(`session:${sessionId}`)
    if (!session) {
      return c.json({ error: 'Session not found' }, 404)
    }

    // Verify user is part of the session
    if (session.studentId !== user.id && session.teacherId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403)
    }

    session.status = 'active'
    session.startTime = new Date().toISOString()
    await kv.set(`session:${sessionId}`, session)

    return c.json({ success: true, session })
  } catch (error) {
    console.log('Start session error:', error)
    return c.json({ error: 'Failed to start session' }, 500)
  }
})

app.post('/make-server-27bc4a45/sessions/:sessionId/end', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const sessionId = c.req.param('sessionId')
    const { studentTime, teacherTime, totalDuration } = await c.req.json()
    
    const session = await kv.get(`session:${sessionId}`)
    if (!session) {
      return c.json({ error: 'Session not found' }, 404)
    }

    // Verify user is part of the session
    if (session.studentId !== user.id && session.teacherId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403)
    }

    session.status = 'completed'
    session.endTime = new Date().toISOString()
    session.studentTime = studentTime || 0
    session.teacherTime = teacherTime || 0
    session.totalDuration = totalDuration || 0
    
    await kv.set(`session:${sessionId}`, session)

    // Update user profiles with session stats
    const studentProfile = await kv.get(`user:${session.studentId}`)
    const teacherProfile = await kv.get(`user:${session.teacherId}`)

    if (studentProfile) {
      studentProfile.completedSessions = (studentProfile.completedSessions || 0) + 1
      studentProfile.totalMinutes = (studentProfile.totalMinutes || 0) + (totalDuration || 0)
      studentProfile.lastActive = new Date().toISOString()
      await kv.set(`user:${session.studentId}`, studentProfile)
    }

    if (teacherProfile) {
      teacherProfile.completedSessions = (teacherProfile.completedSessions || 0) + 1
      teacherProfile.totalMinutes = (teacherProfile.totalMinutes || 0) + (totalDuration || 0)
      teacherProfile.lastActive = new Date().toISOString()
      await kv.set(`user:${session.teacherId}`, teacherProfile)
    }

    return c.json({ success: true, session })
  } catch (error) {
    console.log('End session error:', error)
    return c.json({ error: 'Failed to end session' }, 500)
  }
})

// Reviews and Ratings
app.post('/make-server-27bc4a45/sessions/:sessionId/review', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const sessionId = c.req.param('sessionId')
    const { rating, comment, revieweeId } = await c.req.json()
    
    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return c.json({ error: 'Rating must be between 1 and 5' }, 400)
    }

    const session = await kv.get(`session:${sessionId}`)
    if (!session) {
      return c.json({ error: 'Session not found' }, 404)
    }

    // Verify user is part of the session
    if (session.studentId !== user.id && session.teacherId !== user.id) {
      return c.json({ error: 'Unauthorized' }, 403)
    }

    // Create review
    const review = {
      id: crypto.randomUUID(),
      sessionId,
      reviewerId: user.id,
      revieweeId,
      rating,
      comment: comment || '',
      createdAt: new Date().toISOString()
    }

    await kv.set(`review:${review.id}`, review)

    // Update reviewee's rating
    const revieweeProfile = await kv.get(`user:${revieweeId}`)
    if (revieweeProfile) {
      const currentRating = revieweeProfile.rating || 0
      const currentCount = revieweeProfile.reviewCount || 0
      const newRating = ((currentRating * currentCount) + rating) / (currentCount + 1)
      
      revieweeProfile.rating = Math.round(newRating * 10) / 10 // Round to 1 decimal
      revieweeProfile.reviewCount = currentCount + 1
      revieweeProfile.lastActive = new Date().toISOString()
      
      await kv.set(`user:${revieweeId}`, revieweeProfile)
    }

    return c.json({ success: true, review })
  } catch (error) {
    console.log('Create review error:', error)
    return c.json({ error: 'Failed to create review' }, 500)
  }
})

// Helper function for subscription limits
function getSubscriptionLimits(tier: string) {
  const limits = {
    trial: {
      dailyRequests: 3,
      dailyConnections: 2,
      dailySpeakingTime: 60, // minutes
      totalMinutes: 420, // 7 hours total
    },
    basic: {
      dailyRequests: 10,
      dailyConnections: 5,
      dailySpeakingTime: 180, // 3 hours
      totalMinutes: -1, // unlimited
    },
    standard: {
      dailyRequests: 25,
      dailyConnections: 15,
      dailySpeakingTime: 360, // 6 hours
      totalMinutes: -1, // unlimited
    },
    pro: {
      dailyRequests: -1, // unlimited
      dailyConnections: -1, // unlimited
      dailySpeakingTime: -1, // unlimited
      totalMinutes: -1, // unlimited
    }
  }

  return limits[tier] || limits.trial
}

// Dashboard Analytics
app.get('/make-server-27bc4a45/dashboard/stats', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const profile = await kv.get(`user:${user.id}`)
    
    if (!profile) {
      return c.json({ error: 'Profile not found' }, 404)
    }

    // Get user's sessions
    const allSessions = await kv.getByPrefix('session:')
    const userSessions = allSessions.filter(session => 
      session.studentId === user.id || session.teacherId === user.id
    )

    const completedSessions = userSessions.filter(s => s.status === 'completed')
    const upcomingSessions = userSessions.filter(s => s.status === 'scheduled')

    // Get user's reviews
    const allReviews = await kv.getByPrefix('review:')
    const userReviews = allReviews.filter(review => review.revieweeId === user.id)

    const stats = {
      totalSessions: completedSessions.length,
      totalMinutes: profile.totalMinutes || 0,
      averageRating: profile.rating || 0,
      totalReviews: profile.reviewCount || 0,
      upcomingSessions: upcomingSessions.length,
      skillsOffered: (profile.skills || []).length,
      skillsLearning: (profile.interests || []).length,
      joinedAt: profile.joinedAt,
      subscription: {
        tier: profile.subscriptionTier || 'trial',
        limits: getSubscriptionLimits(profile.subscriptionTier || 'trial')
      }
    }

    return c.json({ stats })
  } catch (error) {
    console.log('Dashboard stats error:', error)
    return c.json({ error: 'Failed to get dashboard stats' }, 500)
  }
})

// Export the app
Deno.serve(app.fetch)