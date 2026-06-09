/** @type {import('tailwindcss').Config} */
//
// A small but complete design-token system, structured the way style.md
// describes Meta's: PRIMITIVES → SEMANTIC/STATE → SCALES (type, motion,
// elevation). Components reference the semantic names, never raw hex.
//
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },

      colors: {
        // ── TIER 1 · PRIMITIVES ──────────────────────────────────────────────
        // Raw, meaning-free ramps. Numbers are perceptual steps, light → dark.
        grey: {
          0: '#F5F5F5',
          1: '#EFEFEF',
          2: '#DBDBDB',
          3: '#C7C7C7',
          4: '#A8A8A8',
          5: '#8E8E8E',
          6: '#737373',
          7: '#555555',
          8: '#363636',
          9: '#262626',
          10: '#1A1A1A',
        },
        blue: {
          0: '#F5FBFF',
          1: '#E0F1FF',
          2: '#B3DBFF',
          3: '#70BCFF',
          4: '#47AFFF',
          5: '#0095F6', // primary
          6: '#0074CC',
          7: '#0057A3',
          8: '#00376B',
          9: '#002952',
        },
        // status primitives
        green: { 5: '#31A24C' },
        red: { 5: '#ED4956' },
        amber: { 5: '#F7B928' },

        // ── TIER 2 · SEMANTIC TOKENS (dark mode) ─────────────────────────────
        // Intent-named. Re-theming = repointing these at the ramps above.
        base: '#000000', // page background — pure black (left panel + footer)
        surface: '#1c1e21', // form column / cards (the lighter right panel)
        'surface-2': '#363636', // inputs, secondary buttons
        line: '#4A4A4A', // hairline borders
        'line-strong': '#828282', // hover / focus borders
        ink: '#F5F5F5', // primary text
        'ink-2': '#C7C7C7', // secondary text / labels
        'ink-3': '#8E8E8E', // tertiary text / placeholder

        // accent + interaction STATES (default / hover / pressed / soft)
        accent: '#0095F6',
        'accent-hover': '#1877F2',
        'accent-pressed': '#0074CC',
        'accent-soft': 'rgba(0,149,246,0.12)', // low-emphasis fill

        // feedback
        positive: '#31A24C',
        negative: '#ED4956',
        warning: '#F7B928',
      },

      // ── TIER 3 · SCALES ────────────────────────────────────────────────────

      // Paired type scale: each step carries its own line-height, so size and
      // rhythm are chosen together. Usage: `text-sys-16`, `text-sys-32`, etc.
      fontSize: {
        'sys-11': ['11px', '13px'],
        'sys-12': ['12px', '16px'],
        'sys-13': ['13px', '17px'],
        'sys-14': ['14px', '18px'],
        'sys-16': ['16px', '20px'],
        'sys-20': ['20px', '25px'],
        'sys-24': ['24px', '28px'],
        'sys-28': ['28px', '32px'],
        'sys-32': ['32px', '40px'],
        'sys-44': ['44px', '48px'],
      },

      // Named easings. Usage: `ease-soft`, `ease-strong`.
      transitionTimingFunction: {
        soft: 'cubic-bezier(.08,.52,.52,1)',
        strong: 'cubic-bezier(.12,.8,.32,1)',
        enter: 'cubic-bezier(0.14,1,0.34,1)',
      },

      // Duration scale, paired in/out (exits faster than entrances).
      // Usage: `duration-short-in`, `duration-medium-out`.
      transitionDuration: {
        'short-in': '280ms',
        'short-out': '200ms',
        'medium-in': '400ms',
        'medium-out': '350ms',
        'long-in': '500ms',
      },

      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },

      // Elevation scale + the brand accent glow.
      boxShadow: {
        base: '0 1px 2px rgba(0,0,0,0.4)',
        elevated: '0 8px 20px 0 rgba(0,0,0,0.4), 0 2px 4px 0 rgba(0,0,0,0.3)',
        emphasis: '0 24px 60px -20px rgba(0,0,0,0.6)',
        glow: '0 6px 20px -6px rgba(0,149,246,0.35)',
        'glow-lg': '0 8px 24px -6px rgba(0,149,246,0.35)',
      },
    },
  },
  plugins: [],
}
