const lightColors = {
  // Base colors
  background: '#ffffff',
  foreground: '#0f172a',

  // Card colors
  card: '#ffffff',
  cardForeground: '#0f172a',

  // Popover colors
  popover: '#ffffff',
  popoverForeground: '#0f172a',

  // Primary colors
  primary: '#0f172a',
  primaryForeground: '#f8fafc',

  // Secondary colors
  secondary: '#f1f5f9',
  secondaryForeground: '#0f172a',

  // Muted colors
  muted: '#f1f5f9',
  mutedForeground: '#64748b',

  // Accent colors
  accent: '#f1f5f9',
  accentForeground: '#0f172a',

  // Destructive colors
  destructive: '#ef4444',
  destructiveForeground: '#f8fafc',

  // Border and input
  border: '#e2e8f0',
  input: '#e2e8f0',
  ring: '#0f172a',

  // Text colors
  text: '#0f172a',
  textMuted: '#64748b',

  // Legacy support for existing components
  tint: '#0f172a',
  icon: '#64748b',
  tabIconDefault: '#64748b',
  tabIconSelected: '#0f172a',
};

const darkColors = {
  // Base colors
  background: '#020817',
  foreground: '#f8fafc',

  // Card colors
  card: '#020817',
  cardForeground: '#f8fafc',

  // Popover colors
  popover: '#020817',
  popoverForeground: '#f8fafc',

  // Primary colors
  primary: '#f8fafc',
  primaryForeground: '#0f172a',

  // Secondary colors
  secondary: '#1e293b',
  secondaryForeground: '#f8fafc',

  // Muted colors
  muted: '#1e293b',
  mutedForeground: '#94a3b8',

  // Accent colors
  accent: '#1e293b',
  accentForeground: '#f8fafc',

  // Destructive colors
  destructive: '#7f1d1d',
  destructiveForeground: '#f8fafc',

  // Border and input
  border: '#1e293b',
  input: '#1e293b',
  ring: '#d1d5db',

  // Text colors
  text: '#f8fafc',
  textMuted: '#94a3b8',

  // Legacy support for existing components
  tint: '#f8fafc',
  icon: '#94a3b8',
  tabIconDefault: '#94a3b8',
  tabIconSelected: '#f8fafc',
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

// Export individual color schemes for easier access
export { darkColors, lightColors };

// Utility type for color keys
export type ColorKeys = keyof typeof lightColors;
