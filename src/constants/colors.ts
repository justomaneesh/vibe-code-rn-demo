// Color constants for Evangel OTT app
// Dark theme with blue accent per PLAN.md design decisions

export const COLORS = {
  // Background colors
  background: '#000000', // Black background
  backgroundSecondary: '#1A1A1A', // Very dark grey for secondary backgrounds
  
  // Text colors
  textPrimary: '#FFFFFF', // White for primary text
  textSecondary: '#E0E0E0', // Light grey for secondary text
  textTertiary: '#B0B0B0', // Lighter grey for metadata
  
  // Accent color (blue)
  accent: '#007AFF', // Blue for primary actions, active states, CTAs
  accentDark: '#0056CC', // Darker blue for pressed states
  
  // UI element colors
  border: '#333333', // Dark grey for borders
  divider: '#2A2A2A', // Slightly lighter grey for dividers
  
  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.7)', // Dark overlay for modals/overlays
  overlayLight: 'rgba(0, 0, 0, 0.5)', // Lighter overlay
} as const;
