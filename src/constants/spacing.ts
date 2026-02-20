// Spacing constants for Evangel OTT app

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Common spacing patterns
  screenPadding: 16, // Horizontal padding for screens
  sectionGap: 24, // Vertical gap between sections
  itemGap: 16, // Gap between items in rows/lists
  cardPadding: 12, // Padding inside cards/tiles
  
  // Border radius
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999, // For fully rounded elements
  },
} as const;
