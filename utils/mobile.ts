// Mobile-first responsive utilities
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const TOUCH_TARGET_SIZE = {
  minimum: 44, // Apple and Android recommendation
  comfortable: 48,
  large: 56,
} as const;

// Responsive text classes for mobile-first design
export const RESPONSIVE_TEXT = {
  hero: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
  title: 'text-xl sm:text-2xl lg:text-3xl',
  subtitle: 'text-lg sm:text-xl lg:text-2xl',
  body: 'text-sm sm:text-base lg:text-lg',
  caption: 'text-xs sm:text-sm lg:text-base',
} as const;

// Mobile-optimized spacing
export const RESPONSIVE_SPACING = {
  section: 'py-8 sm:py-12 lg:py-16',
  card: 'p-4 sm:p-6 lg:p-8',
  gap: 'gap-4 sm:gap-6 lg:gap-8',
  margin: 'mb-8 sm:mb-12 lg:mb-16',
} as const;

// Touch-friendly button variants
export const BUTTON_VARIANTS = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 text-white focus:ring-blue-500',
  secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 active:from-gray-700 active:to-gray-800 text-white focus:ring-gray-500',
  success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white focus:ring-green-500',
  warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 active:from-yellow-700 active:to-yellow-800 text-white focus:ring-yellow-500',
  info: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:from-purple-700 active:to-pink-700 text-white focus:ring-purple-500',
} as const;

// Mobile detection utility
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.md;
};

// Touch device detection
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Viewport height utility for mobile browsers
export const getViewportHeight = () => {
  if (typeof window === 'undefined') return '100vh';
  return `${window.innerHeight}px`;
};

// Safe area utilities for devices with notches
export const SAFE_AREA = {
  top: 'pt-[env(safe-area-inset-top)]',
  bottom: 'pb-[env(safe-area-inset-bottom)]',
  left: 'pl-[env(safe-area-inset-left)]',
  right: 'pr-[env(safe-area-inset-right)]',
} as const;
