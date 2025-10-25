/**
 * Vietnamese Republic E-Book Theme
 * Colors inspired by the Vietnamese Republic flag and traditional Vietnamese aesthetics
 * Yellow (#FFCD00) and Red (#DA291C) are the primary colors from the flag
 */

import { Platform } from 'react-native';

// Vietnamese Republic flag colors
const vnrYellow = '#FFCD00'; // Vietnamese yellow
const vnrRed = '#DA291C'; // Vietnamese red
const vnrGold = '#D4AF37'; // Traditional gold accent
const vnrBrown = '#8B4513'; // Aged paper brown

const tintColorLight = vnrRed;
const tintColorDark = vnrYellow;

export const Colors = {
  light: {
    text: '#2C1810', // Dark brown for text (like ink on paper)
    background: '#FFF8E7', // Cream/aged paper color
    tint: tintColorLight,
    icon: '#8B4513',
    tabIconDefault: '#A0522D',
    tabIconSelected: tintColorLight,
    pageBackground: '#FFFEF0', // Slightly lighter page color
    cardBackground: '#F5E6D3', // Card/section background
    accent: vnrYellow,
    accentSecondary: vnrGold,
    border: '#D4A76A',
    shadow: 'rgba(139, 69, 19, 0.2)',
  },
  dark: {
    text: '#F5E6D3', // Light cream text
    background: '#1A0F0A', // Very dark brown
    tint: tintColorDark,
    icon: '#D4AF37',
    tabIconDefault: '#A0826D',
    tabIconSelected: tintColorDark,
    pageBackground: '#2C1810', // Dark brown page
    cardBackground: '#3D2517', // Slightly lighter card
    accent: vnrRed,
    accentSecondary: vnrYellow,
    border: '#5C4033',
    shadow: 'rgba(255, 205, 0, 0.3)',
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
