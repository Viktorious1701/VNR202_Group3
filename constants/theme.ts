/**
 * Vietnamese Republic E-Book Theme - Cold Color Palette
 * Colors inspired by the Vietnamese Republic flag with a cooler, more contemporary feel
 * Yellow (#FFCD00) and Red (#DA291C) preserved as accent colors from the flag
 * Base palette shifted to cool blues, grays, and muted tones
 */

import { Platform } from 'react-native';

// Vietnamese Republic flag colors (preserved)
const vnrYellow = '#FFCD00'; // Vietnamese yellow
const vnrRed = '#DA291C'; // Vietnamese red

// Cool color palette
const coolSlate = '#475569'; // Cool slate gray
const coolBlue = '#1e3a5f'; // Deep cool blue
const iceBlue = '#e0f2fe'; // Light ice blue
const steelGray = '#64748b'; // Steel gray
const frostWhite = '#f8fafc'; // Frost white
const deepNavy = '#0f172a'; // Deep navy
const mistGray = '#cbd5e1'; // Mist gray
const glacierBlue = '#bae6fd'; // Glacier blue

const tintColorLight = vnrRed;
const tintColorDark = vnrYellow;

export const Colors = {
  light: {
    text: '#1e293b', // Cool dark slate
    background: '#f1f5f9', // Cool light gray
    tint: tintColorLight,
    icon: coolSlate,
    tabIconDefault: steelGray,
    tabIconSelected: tintColorLight,
    pageBackground: frostWhite, // Frost white for pages
    cardBackground: '#ffffff', // Pure white cards
    accent: vnrYellow,
    accentSecondary: glacierBlue,
    border: mistGray,
    shadow: 'rgba(71, 85, 105, 0.15)',
  },
  dark: {
    text: '#e2e8f0', // Cool light slate
    background: '#0f172a', // Deep navy background
    tint: tintColorDark,
    icon: mistGray,
    tabIconDefault: steelGray,
    tabIconSelected: tintColorDark,
    pageBackground: '#1e293b', // Cool dark slate page
    cardBackground: '#334155', // Slate card background
    accent: vnrRed,
    accentSecondary: iceBlue,
    border: '#475569',
    shadow: 'rgba(255, 205, 0, 0.25)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});