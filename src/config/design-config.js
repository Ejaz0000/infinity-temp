/**
 * InfinityShoes - Design Configuration
 * 
 * This file contains all design tokens including colors, spacing, typography,
 * and other variables used throughout the landing page design.
 * 
 * Updated: January 30, 2026
 */

export const designConfig = {
  // Primary Color Palette - InfinityShoes Brand Colors
  colors: {
    // Primary Colors - New Dark Theme
    primary: {
      dark: '#0b0f19',      // Dark version
      main: '#1d2330',       // Main theme color
      light: '#374151',      // Medium gray for secondary text
      lighter: '#6b7280',    // Light gray
      lightest: '#f3f4f6',   // Off-white background
    },
    // Accent Colors - New Theme
    accent: {
      main: '#1d2330',       // Primary accent - main theme color
      dark: '#0b0f19',       // Dark version
      black: '#00030c',      // Black version (use instead of pure black)
      // Legacy support
      orange: '#1d2330',     // Maps to main for backward compatibility
      orangeLight: '#374151',
      orangeDark: '#0b0f19',
      red: '#ef4444',        // Error/Alert red
      green: '#10b981',      // Success green
      yellow: '#f59e0b',     // Warning yellow
      blue: '#3b82f6',       // Info blue
    },
    // Neutral Colors
    neutral: {
      white: '#ffffff',
      black: '#00030c',      // Use this instead of pure black
      gray100: '#f9fafb',
      gray200: '#f3f4f6',
      gray300: '#e5e7eb',
      gray400: '#d1d5db',
      gray500: '#9ca3af',
      gray600: '#6b7280',
      gray700: '#4b5563',
      gray800: '#1d2330',    // Maps to main theme
      gray900: '#0b0f19',    // Maps to dark theme
    },
    // Semantic Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Typography
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',        // 12px
      sm: '0.875rem',       // 14px
      base: '1rem',         // 16px
      lg: '1.125rem',       // 18px
      xl: '1.25rem',        // 20px
      '2xl': '1.5rem',      // 24px
      '3xl': '1.875rem',    // 30px
      '4xl': '2.25rem',     // 36px
      '5xl': '3rem',        // 48px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },

  // Spacing System (8px base unit)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '2.5rem',  // 40px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
    '5xl': '5rem',    // 80px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    xs: '0.25rem',    // 4px
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadow System
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  // Transitions and Animations
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
    slower: '500ms ease-in-out',
  },

  // Breakpoints for Responsive Design
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component-specific configurations
  components: {
    header: {
      topbarHeight: '2.5rem',      // 40px
      navbarHeight: '3.75rem',     // 60px
      logoHeight: '2.5rem',        // 40px
    },
    hero: {
      minHeight: '500px',
      imageOpacity: 0.7,
      overlayBg: 'rgba(0, 0, 0, 0.3)',
    },
    card: {
      hoverScale: 1.05,
      hoverShadowColor: 'rgba(29, 35, 48, 0.2)',  // Updated to new theme color
    },
    button: {
      defaultHeight: '2.75rem',    // 44px
      defaultPadding: '0.75rem 1.5rem',
    },
  },
};

export default designConfig;
