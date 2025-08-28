import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Camera,
  Save,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
  user?: any;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function SettingsPage({ onNavigate, isDarkMode, toggleDarkMode }: SettingsPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate learner and teacher. Love sharing knowledge about web development and design.',
    location: 'San Francisco, CA'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    newMessages: true,
    weeklyDigest: false,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showOnlineStatus: true,
    allowDirectMessages: true,
    dataCollection: true
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    // Save profile changes
    console.log('Saving profile:', profile);
  };

  const handleSavePasswords = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Save password changes
    console.log('Saving password changes');
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Header */}
      <header className="glass-nav border-b border-white/20 dark:border-slate-700/50 p-4 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Section */}
          <Card className="glass-card border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-skillswap-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback className="text-lg">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="glass-card border-white/30 dark:border-slate-600/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="glass-card border-white/30 dark:border-slate-600/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="glass-card border-white/30 dark:border-slate-600/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="glass-card border-white/30 dark:border-slate-600/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 glass-card border-white/30 dark:border-slate-600/30 rounded-lg resize-none h-20 bg-transparent text-sm"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button onClick={handleSaveProfile} className="btn-glow">
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="glass-card border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-skillswap-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={passwords.currentPassword}
                      onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                      className="glass-card border-white/30 dark:border-slate-600/30 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      className="glass-card border-white/30 dark:border-slate-600/30 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      className="glass-card border-white/30 dark:border-slate-600/30 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={handleSavePasswords} variant="outline" className="w-full md:w-auto">
                <Lock className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notifications */}
            <Card className="glass-card border-white/20 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-skillswap-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Mobile app notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, pushNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Reminders</Label>
                    <p className="text-xs text-muted-foreground">Upcoming session alerts</p>
                  </div>
                  <Switch
                    checked={notifications.sessionReminders}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, sessionReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Messages</Label>
                    <p className="text-xs text-muted-foreground">Chat notifications</p>
                  </div>
                  <Switch
                    checked={notifications.newMessages}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, newMessages: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-xs text-muted-foreground">Weekly activity summary</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weeklyDigest: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance & Privacy */}
            <Card className="glass-card border-white/20 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isDarkMode ? <Moon className="w-5 h-5 text-skillswap-primary" /> : <Sun className="w-5 h-5 text-skillswap-primary" />}
                  Appearance & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Switch theme appearance</p>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profile Visibility</Label>
                    <p className="text-xs text-muted-foreground">Make profile public</p>
                  </div>
                  <Switch
                    checked={privacy.profileVisibility}
                    onCheckedChange={(checked) => 
                      setPrivacy({ ...privacy, profileVisibility: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Online Status</Label>
                    <p className="text-xs text-muted-foreground">Show when you're online</p>
                  </div>
                  <Switch
                    checked={privacy.showOnlineStatus}
                    onCheckedChange={(checked) => 
                      setPrivacy({ ...privacy, showOnlineStatus: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Direct Messages</Label>
                    <p className="text-xs text-muted-foreground">Allow messages from anyone</p>
                  </div>
                  <Switch
                    checked={privacy.allowDirectMessages}
                    onCheckedChange={(checked) => 
                      setPrivacy({ ...privacy, allowDirectMessages: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Collection</Label>
                    <p className="text-xs text-muted-foreground">Analytics and insights</p>
                  </div>
                  <Switch
                    checked={privacy.dataCollection}
                    onCheckedChange={(checked) => 
                      setPrivacy({ ...privacy, dataCollection: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Legal & Support */}
          <Card className="glass-card border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-skillswap-primary" />
                Legal & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('terms')}
                  className="glass-card border-white/30 dark:border-slate-600/30"
                >
                  Terms & Conditions
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('privacy')}
                  className="glass-card border-white/30 dark:border-slate-600/30"
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('help')}
                  className="glass-card border-white/30 dark:border-slate-600/30"
                >
                  Help Center
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="glass-card border-red-200 dark:border-red-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Trash2 className="w-5 h-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50">
                  <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        // Handle account deletion
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}