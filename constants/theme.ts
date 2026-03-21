import { Platform } from 'react-native';

export const colors = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6B6B',
  textTertiary: '#999999',
  accent: '#1A1A1A',
  border: '#E5E5E5',
  hairline: '#F2F2F2',
  cardBg: '#FFFFFF',
  error: '#CC4444',
  success: '#4A7C59',

  text: '#1A1A1A',
  highlight: '#FEF3C7',
  accentLight: '#F0F0F0',
  accentSubtle: '#F0F0F0',
  borderMedium: '#D1D1D1',
  borderDark: '#C7C7C7',
  borderLight: '#F2F2F2',
  tabActive: '#1A1A1A',
  tabInactive: '#ADADAD',
  tabBarBg: '#FAFAFA',
  tabDot: '#1A1A1A',
  surfaceRaised: '#F5F5F5',
  surfaceSubtle: '#E5E5E5',
  textMuted: '#C7C7C7',
};

export const typography = {
  sansSerif: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
  }),
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia, "Times New Roman", serif',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: '"SF Mono", Menlo, monospace',
  }),
  rounded: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: '-apple-system, BlinkMacSystemFont, "SF Pro Rounded", system-ui, sans-serif',
  }),
};

export const fontSize = {
  '2xs': 10,
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
};

export const spacing = {
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  '3xl': 36,
  '4xl': 48,
  '5xl': 64,
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};
