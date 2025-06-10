const lightColors = {
  // Primary text - App names, main content, message text
  text: '#000000',

  // Secondary text - Timestamps, subtitles, contact details (60% opacity)
  textSecondary: 'rgba(60, 60, 67, 0.6)', // #3C3C43 with 60% opacity

  // Tertiary text - Placeholder text, disabled items, footer text (30% opacity)
  textTertiary: 'rgba(60, 60, 67, 0.3)', // #3C3C43 with 30% opacity

  // Main app backgrounds - Settings, Mail, Notes content area
  background: '#FFFFFF',

  // Table cells, message bubbles, toolbar backgrounds
  foreground: '#F2F2F7',

  // Input fields, selected cells, navigation bars
  backgroundSecondary: '#FFFFFF',

  // Settings app background, grouped lists background
  groupedBackground: '#F2F2F7',

  // Individual setting cells, grouped sections
  groupedBackgroundSecondary: '#FFFFFF',

  // Card views within grouped lists
  groupedBackgroundTertiary: '#F2F2F7',

  // Button backgrounds, overlay modals (20% opacity)
  primary: 'rgba(120, 120, 128, 0.2)', // #787880 with 20% opacity

  // Secondary button states (16% opacity)
  fillSecondary: 'rgba(120, 120, 128, 0.16)', // #787880 with 16% opacity

  // Loading states, progress indicators (12% opacity)
  fillTertiary: 'rgba(118, 118, 128, 0.12)', // #767680 with 12% opacity

  // Subtle fill states (8% opacity)
  fillQuaternary: 'rgba(116, 116, 128, 0.08)', // #747480 with 8% opacity

  // Default buttons, links, Send button, selected tabs
  blue: '#007AFF',

  // Success states, FaceTime buttons, completed tasks
  green: '#34C759',

  // Delete buttons, error states, critical alerts
  red: '#FF3B30',

  // VoiceOver highlights, warning states
  orange: '#FF9500',

  // Notes app accent, Reminders highlights
  yellow: '#FFCC00',

  // Pink accent color for various UI elements
  pink: '#FF2D92',

  // Purple accent for creative apps and features
  purple: '#AF52DE',

  // Teal accent for communication features
  teal: '#5AC8FA',

  // Indigo accent for system features
  indigo: '#5856D6',

  // Lines between table cells, navigation dividers (29% opacity)
  separator: 'rgba(60, 60, 67, 0.29)', // #3C3C43 with 29% opacity

  // Thick dividers, card borders, strong visual breaks
  separatorOpaque: '#C6C6C8',
};

const darkColors = {
  // Primary text - App names, main content, message text
  text: '#FFFFFF',

  // Secondary text - Timestamps, subtitles, contact details (60% opacity)
  textSecondary: 'rgba(235, 235, 245, 0.6)', // #EBEBF5 with 60% opacity

  // Tertiary text - Placeholder text, disabled items, footer text (30% opacity)
  textTertiary: 'rgba(235, 235, 245, 0.3)', // #EBEBF5 with 30% opacity

  // Main app backgrounds - Settings, Mail, Notes content area
  background: '#000000',

  // Table cells, message bubbles, toolbar backgrounds
  foreground: '#1C1C1E',

  // Input fields, selected cells, navigation bars
  backgroundSecondary: '#2C2C2E',

  // Settings app background, grouped lists background
  groupedBackground: '#000000',

  // Individual setting cells, grouped sections
  groupedBackgroundSecondary: '#1C1C1E',

  // Card views within grouped lists
  groupedBackgroundTertiary: '#2C2C2E',

  // Button backgrounds, overlay modals (36% opacity)
  primary: 'rgba(120, 120, 128, 0.36)', // #787880 with 36% opacity

  // Secondary button states (32% opacity)
  fillSecondary: 'rgba(120, 120, 128, 0.32)', // #787880 with 32% opacity

  // Loading states, progress indicators (24% opacity)
  fillTertiary: 'rgba(118, 118, 128, 0.24)', // #767680 with 24% opacity

  // Subtle fill states (18% opacity)
  fillQuaternary: 'rgba(116, 116, 128, 0.18)', // #747480 with 18% opacity

  // Default buttons, links, Send button, selected tabs
  blue: '#0A84FF',

  // Success states, FaceTime buttons, completed tasks
  green: '#30D158',

  // Delete buttons, error states, critical alerts
  red: '#FF453A',

  // VoiceOver highlights, warning states
  orange: '#FF9F0A',

  // Notes app accent, Reminders highlights
  yellow: '#FFD60A',

  // Pink accent color for various UI elements
  pink: '#FF375F',

  // Purple accent for creative apps and features
  purple: '#BF5AF2',

  // Teal accent for communication features
  teal: '#64D2FF',

  // Indigo accent for system features
  indigo: '#5E5CE6',

  // Lines between table cells, navigation dividers (65% opacity)
  separator: 'rgba(84, 84, 88, 0.65)', // #545458 with 65% opacity

  // Thick dividers, card borders, strong visual breaks
  separatorOpaque: '#38383A',
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

// Export individual color schemes for easier access
export { darkColors, lightColors };

// Utility type for color keys
export type ColorKeys = keyof typeof lightColors;
