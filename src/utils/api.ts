import { projectId, publicAnonKey } from './supabase/info'

// Base API configuration
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27bc4a45`

// API client class for making authenticated requests
class SkillSwapAPI {
  private accessToken: string | null = null

  setAccessToken(token: string | null) {
    this.accessToken = token
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken || publicAnonKey}`,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error(`API Error (${response.status}):`, data)
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health')
  }

  // Authentication
  async signup(userData: {
    email: string
    password: string
    name: string
    dateOfBirth: string
  }) {
    return this.makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // User Profile
  async getProfile() {
    return this.makeRequest('/user/profile')
  }

  async updateProfile(updates: any) {
    return this.makeRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  // Skills Management
  async updateSkills(skillsData: {
    skills: any[]
    interests: any[]
  }) {
    return this.makeRequest('/user/skills', {
      method: 'POST',
      body: JSON.stringify(skillsData),
    })
  }

  async searchSkills(query?: string, category?: string) {
    const params = new URLSearchParams()
    if (query) params.append('q', query)
    if (category) params.append('category', category)
    
    const queryString = params.toString()
    const endpoint = `/skills/search${queryString ? `?${queryString}` : ''}`
    
    return this.makeRequest(endpoint)
  }

  // Subscription Management
  async getSubscriptionStatus() {
    return this.makeRequest('/subscription/status')
  }

  async upgradeSubscription(tier: string) {
    return this.makeRequest('/subscription/upgrade', {
      method: 'POST',
      body: JSON.stringify({ tier }),
    })
  }

  // Session Booking
  async requestSession(sessionData: {
    teacherId: string
    skillId: string
    message?: string
    preferredTime?: string
  }) {
    return this.makeRequest('/sessions/request', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    })
  }

  async getSessionRequests(type: 'sent' | 'received' = 'received') {
    return this.makeRequest(`/sessions/requests?type=${type}`)
  }

  async respondToSessionRequest(requestData: {
    requestId: string
    action: 'accept' | 'decline'
    scheduledTime?: string
  }) {
    return this.makeRequest('/sessions/respond', {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
  }

  // Active Sessions
  async getActiveSessions() {
    return this.makeRequest('/sessions/active')
  }

  async startSession(sessionId: string) {
    return this.makeRequest(`/sessions/${sessionId}/start`, {
      method: 'POST',
    })
  }

  async endSession(sessionId: string, sessionData: {
    studentTime: number
    teacherTime: number
    totalDuration: number
  }) {
    return this.makeRequest(`/sessions/${sessionId}/end`, {
      method: 'POST',
      body: JSON.stringify(sessionData),
    })
  }

  // Reviews and Ratings
  async submitReview(sessionId: string, reviewData: {
    rating: number
    comment?: string
    revieweeId: string
  }) {
    return this.makeRequest(`/sessions/${sessionId}/review`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    })
  }

  // Dashboard Analytics
  async getDashboardStats() {
    return this.makeRequest('/dashboard/stats')
  }
}

// Create singleton instance
export const skillSwapAPI = new SkillSwapAPI()

// Helper function to handle API errors consistently
export function handleAPIError(error: any, fallbackMessage = 'An unexpected error occurred') {
  console.error('API Error:', error)
  
  // Handle fetch errors (network issues, CORS, etc.)
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return 'Unable to connect to servers. Please check your internet connection and try again.'
  }
  
  // Handle specific error types
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error - please check your connection and try again.'
  }
  
  // Handle server errors
  if (error.message && error.message.includes('500')) {
    return 'Server error - please try again in a moment.'
  }
  
  // Handle authentication errors
  if (error.message && error.message.includes('401')) {
    return 'Authentication failed - please sign in again.'
  }
  
  // Handle validation errors
  if (error.message && error.message.includes('400')) {
    return error.message
  }
  
  if (error.message) {
    return error.message
  }
  
  return fallbackMessage
}

// Subscription tier utilities
export const SUBSCRIPTION_TIERS = {
  trial: {
    name: 'Free Trial',
    price: 0,
    duration: '7 days',
    limits: {
      dailyRequests: 3,
      dailyConnections: 2,
      dailySpeakingTime: 60,
      totalMinutes: 420,
    }
  },
  basic: {
    name: 'Basic',
    price: 10,
    duration: 'per month',
    limits: {
      dailyRequests: 10,
      dailyConnections: 5,
      dailySpeakingTime: 180,
      totalMinutes: -1,
    }
  },
  standard: {
    name: 'Standard',
    price: 25,
    duration: 'per month',
    limits: {
      dailyRequests: 25,
      dailyConnections: 15,
      dailySpeakingTime: 360,
      totalMinutes: -1,
    }
  },
  pro: {
    name: 'Pro',
    price: 50,
    duration: 'per month',
    limits: {
      dailyRequests: -1,
      dailyConnections: -1,
      dailySpeakingTime: -1,
      totalMinutes: -1,
    }
  }
}

export function formatLimit(value: number, unit: string = '') {
  if (value === -1) return 'Unlimited'
  return `${value}${unit ? ` ${unit}` : ''}`
}

export function formatDuration(minutes: number) {
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${remainingMinutes}m`
}