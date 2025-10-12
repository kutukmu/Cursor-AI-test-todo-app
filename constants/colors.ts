/**
 * Color Palette for Hair Care Routine App
 * 
 * This file contains all the colors used throughout the app.
 * Update these values to change the entire app's color scheme.
 */
export const Colors = {
    // 🌞 Primary Colors - Brand core (sunset orange family)
    primary: {
      main: '#FF6A2E',        // Vibrant sunset orange
      light: '#FF9565',       // Soft coral-orange
      dark: '#E2551F',        // Deep radiant orange
      100: '#FFF1E5',         // Light peach background
      200: '#FFE0CC',         // Soft peach
      300: '#FFC8A6',         // Mid peach
      400: '#FF9565',         // Coral tone
      500: '#FF6A2E',         // Brand core
      600: '#E2551F',
      700: '#CC4A1A',
    },
  
    // ✨ Secondary Colors - Accent golds and highlights
    secondary: {
      main: '#FFD66E',        // Golden glow
      light: '#FFE8A3',       // Soft pastel gold
      dark: '#E6B84D',        // Rich golden amber
      100: '#FFF9E6',
      200: '#FFF3CC',
      300: '#FFE8A3',
      400: '#FFD66E',
      500: '#E6B84D',
      600: '#D1A841',
      700: '#B89136',
    },
  
    // 🌤️ Neutrals - Light, clean, warm-toned neutrals (no gray or brown)
    neutral: {
      white: '#FFFFFF',
      black: '#1E1E1E',
      50:  '#FFF9F4',         // Warm ivory
      100: '#FFF4EB',         // Soft cream
      200: '#FFEADA',         // Warm blush beige
      300: '#FFDCC0',         // Light peach
      400: '#FFCFA6',         // Soft coral-neutral
      500: '#FFB57A',         // Muted orange-peach
      600: '#FF9654',         // Mid-tone orange
      700: '#E25E1F',         // Contrast accent
      800: '#C94E18',         // Deep orange (for borders)
      900: '#992E0A',         // Darker orange-red (text contrast)
    },
  
    // 💬 Semantic Colors - Warm but clear differentiation
    success: {
      main: '#7DDC72',        // Fresh soft green
      light: '#B4F1A9',
      dark: '#5CB85F',
    },
  
    warning: {
      main: '#FFAA33',        // Bright amber-orange
      light: '#FFD580',
      dark: '#E68F00',
    },
  
    error: {
      main: '#FF5A4F',        // Coral red
      light: '#FF8A80',
      dark: '#E63E35',
    },
  
    info: {
      main: '#FFB866',        // Warm golden orange (instead of blue)
      light: '#FFD8A3',
      dark: '#E6963A',
    },
  
    // 🌇 Gradients - Warm, glowing transitions
    gradients: {
      sunrise: ['#FFE0CC', '#FFC8A6', '#FF6A2E'],        // gentle orange glow
      sunset: ['#FFD8A3', '#FFB866', '#E2551F'],         // strong warm fade
      goldenGlow: ['#FFF4EB', '#FFE8A3', '#FFD66E'],     // luxury feel
      peachDream: ['#FFF4EB', '#FFE0CC', '#FFC8A6'],     // soft & inviting
      coralEnergy: ['#FFB57A', '#FF6A2E', '#E63E35'],    // energetic splash
    },
  
    // 💇 Hair Type Colors - Bright and cheerful tones
    hairTypes: {
      straight: '#FFD66E',    // Golden Glow
      wavy: '#FF6A2E',        // Sunset Orange
      curly: '#FF8A50',       // Warm Coral
      coily: '#FFB866',       // Honey Peach
      mixed: '#FFE0CC',       // Soft Peach Cream
    },
  
    // 🌙 Overlay Colors - Warm glows and transparent highlights
    overlay: {
      light: 'rgba(255, 244, 235, 0.95)',  // Soft ivory
      medium: 'rgba(255, 224, 204, 0.75)', // Peach veil
      dark: 'rgba(226, 85, 31, 0.55)',     // Warm orange overlay
      backdrop: 'rgba(226, 85, 31, 0.35)', // Light warm tint
    },
  
    // ☀️ Shadows - Warm light shadows (no gray or brown undertones)
    shadow: {
      light: 'rgba(255, 106, 46, 0.10)',   // Subtle warm key light
      medium: 'rgba(255, 106, 46, 0.20)',
      dark: 'rgba(226, 85, 31, 0.30)',
    },
  } as const;
  
  

/**
 * Light Theme Colors
 */
export const LightTheme = {
  background: Colors.gradients.sunrise,
  surface: Colors.neutral.white,
  card: Colors.neutral[50],
  border: Colors.neutral[200],
  text: {
    primary: Colors.neutral[900],
    secondary: Colors.neutral[600],
    disabled: Colors.neutral[400],
    inverse: Colors.neutral.white,
  },
  primary: Colors.primary.dark,      // Darker orange for buttons (#E2551F)
  primaryLight: Colors.primary.light,
  secondary: Colors.secondary.main,
  success: Colors.success.main,
  warning: Colors.warning.main,
  error: Colors.error.main,
  info: Colors.info.main,
  overlay: Colors.neutral[900],
} as const;

/**
 * Dark Theme Colors
 */
export const DarkTheme = {
  background: Colors.gradients.coralEnergy,
  surface: Colors.neutral[500], // Lighter muted orange-peach
  card: Colors.neutral[400],    // Lighter soft coral-neutral
  border: Colors.neutral[500],
  text: {
    primary: Colors.neutral.black,  // Black text for contrast
    secondary: Colors.neutral[800], // Dark orange for secondary
    disabled: Colors.neutral[500],
    inverse: Colors.neutral.white,
  },
  primary: Colors.primary.light,
  primaryLight: Colors.primary[300],
  secondary: Colors.secondary.light,
  success: Colors.success.light,
  warning: Colors.warning.light,
  error: Colors.error.light,
  info: Colors.info.light,
  overlay: Colors.neutral.white,
} as const;

/**
 * Helper function to create color with opacity
 */
export const withOpacity = (color: string, opacity: number): string => {
  // If color is already rgba, extract rgb and apply new opacity
  if (color.startsWith('rgba')) {
    const rgb = color.match(/\d+/g)?.slice(0, 3).join(', ');
    return `rgba(${rgb}, ${opacity})`;
  }
  
  // If color is hex, convert to rgba
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  return color;
};

/**
 * Spacing values for consistent layout
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Border radius values
 */
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/**
 * Font sizes
 */
export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
} as const;

/**
 * Font weights
 */
export const FontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
  black: '900' as const,
} as const;

/**
 * Shadow presets
 */
export const Shadows = {
  sm: {
    shadowColor: Colors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: Colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

export default Colors;

