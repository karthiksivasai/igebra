/**
 * Merge into your tailwind.config.js `theme.extend` so SignInModal matches the static site tokens.
 *
 *   const signInPreset = require('./components/tailwind.preset.cjs');
 *   module.exports = {
 *     presets: [],
 *     theme: { extend: { ...signInPreset.theme.extend } },
 *   };
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0d0d0d', muted: '#555555', faint: '#999999' },
        surface: '#faf6f8',
        brand: {
          DEFAULT: '#e91e63',
          hover: '#c2185b',
          soft: 'rgba(233, 30, 99, 0.1)',
          ring: 'rgba(233, 30, 99, 0.35)',
        },
        accent: { DEFAULT: '#7a1448', light: '#fce8f0' },
        border: { DEFAULT: 'rgba(0,0,0,0.09)', strong: 'rgba(0,0,0,0.16)' },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        modal: '1rem',
        input: '0.625rem',
        btn: '0.6875rem',
      },
      boxShadow: {
        modal: '0 24px 48px rgba(90, 40, 70, 0.12), 0 0 0 1px rgba(255,255,255,0.8) inset',
        'btn-primary': '0 4px 14px rgba(233, 30, 99, 0.28)',
        'btn-primary-hover': '0 8px 22px rgba(233, 30, 99, 0.32)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
};
