/**
 * OutRun Design System
 *
 * A comprehensive design system for the OutRun ecosystem that ensures
 * visual consistency across all modules with a unified aesthetic.
 */

// Color System
export const colors = {
  // Brand Colors
  brand: {
    primary: "#a855f7", // Purple
    secondary: "#ec4899", // Pink
    tertiary: "#3b82f6", // Blue
    quaternary: "#06b6d4", // Cyan
  },

  // Functional Colors
  functional: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Text Colors
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.8)",
    muted: "rgba(255, 255, 255, 0.6)",
    disabled: "rgba(255, 255, 255, 0.4)",
  },

  // Background Colors
  background: {
    primary: "#0f0326",
    secondary: "#1a0445",
    tertiary: "#000000",
    card: "rgba(0, 0, 0, 0.6)",
    overlay: "rgba(0, 0, 0, 0.8)",
  },

  // Border Colors
  border: {
    primary: "rgba(255, 255, 255, 0.1)",
    secondary: "rgba(255, 255, 255, 0.05)",
    focus: "rgba(168, 85, 247, 0.5)",
  },
}

// Gradient Presets
export const gradients = {
  // Common Gradients
  primary: "from-purple-600 to-pink-600",
  secondary: "from-blue-600 to-cyan-600",
  tertiary: "from-pink-600 to-purple-600",
  dark: "from-gray-900 to-black",

  // Feature Card Gradients
  feature1: "from-purple-500 to-indigo-600",
  feature2: "from-pink-500 to-purple-600",
  feature3: "from-blue-500 to-indigo-600",
  feature4: "from-cyan-500 to-blue-600",
  feature5: "from-purple-500 to-pink-600",
  feature6: "from-indigo-500 to-blue-600",
}

// Typography
export const typography = {
  // Font Families
  fontFamily: {
    primary: "var(--font-montserrat), system-ui, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },

  // Font Sizes
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },

  // Font Weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  // Line Heights
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Letter Spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
}

// Spacing System
export const spacing = {
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
}

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
}

// Shadows
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",
  // Glow effects
  glow: {
    purple: "0 0 15px rgba(168, 85, 247, 0.5)",
    pink: "0 0 15px rgba(236, 72, 153, 0.5)",
    blue: "0 0 15px rgba(59, 130, 246, 0.5)",
    cyan: "0 0 15px rgba(6, 182, 212, 0.5)",
  },
}

// Animation
export const animation = {
  // Timing Functions
  easing: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Duration
  duration: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },
}

// Z-index
export const zIndex = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto",
}

// Breakpoints
export const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

// Component-specific styles
export const components = {
  // Button Styles
  button: {
    // Base styles
    base: "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",

    // Variants
    variants: {
      primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-md",
      secondary: "bg-transparent border text-white hover:bg-white/10",
      outline: "bg-transparent border border-white/20 text-white hover:bg-white/10",
      ghost: "bg-transparent hover:bg-white/5 text-white",
    },

    // Sizes
    sizes: {
      sm: "h-8 px-3 text-xs rounded-md",
      md: "h-10 px-4 text-sm rounded-md",
      lg: "h-12 px-6 text-base rounded-lg",
      xl: "h-14 px-8 text-lg rounded-xl",
    },
  },

  // Card Styles
  card: {
    // Base styles
    base: "relative overflow-hidden rounded-xl backdrop-blur-sm",

    // Variants
    variants: {
      primary: "bg-black/60 border border-white/10",
      secondary: "bg-white/5 border border-white/5",
      outline: "bg-transparent border border-white/10",
    },
  },

  // Input Styles
  input: {
    // Base styles
    base: "w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50",
  },

  // Badge Styles
  badge: {
    // Base styles
    base: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",

    // Variants
    variants: {
      primary: "bg-white/10 text-white",
      secondary: "bg-black/30 text-white",
      outline: "bg-transparent border border-white/20 text-white",
    },
  },
}

// Export the complete design system
const designSystem = {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  zIndex,
  breakpoints,
  components,
}

export default designSystem
export { designSystem }
