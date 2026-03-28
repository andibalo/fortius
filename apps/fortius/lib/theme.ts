/**
 * Design tokens — single source of truth for the Fortius site.
 * To retheme: update values here AND the matching @theme block in app/globals.css.
 */
export const theme = {
  colors: {
    primary: '#9b00e8',
    primaryDark: '#4a0070',
    accent: '#c1121f',
    dark: '#050505',
    textMain: '#ffffff',
  },
  fonts: {
    inter: 'Inter, sans-serif',
    oswald: 'Oswald, sans-serif',
  },
} as const;

export type ThemeColors = typeof theme.colors;
export type ThemeFonts = typeof theme.fonts;
