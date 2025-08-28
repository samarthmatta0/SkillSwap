export const SESSION_CONSTANTS = {
  MAX_SESSION_TIME: 45 * 60, // 45 minutes in seconds
  WARNING_TIME: 120, // 2 minutes in seconds  
  CRITICAL_TIME: 30, // 30 seconds
  SPEAKER_CHANGE_PROBABILITY: 0.1, // 10% chance per second
  TIMER_INTERVAL: 1000, // 1 second
} as const;

export const MOCK_PROVIDER = {
  name: "Maria Rodriguez",
  avatar: "/api/placeholder/60/60",
  skill: "Spanish Conversation",
  verified: true
} as const;

export type SpeakerType = 'user' | 'provider' | null;