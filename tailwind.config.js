import plugin from 'tailwindcss/plugin';

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: withOpacity('--color-primary'),
          light: 'rgb(56, 189, 248)',
          dark: 'rgb(14, 165, 233)',
        },
        body: {
          DEFAULT: withOpacity('--color-text'),
          300: 'var(--color-text-300)',
          700: 'var(--color-text-700)',
        },
        background: {
          DEFAULT: withOpacity('--color-background'),
          card: 'rgb(30, 41, 59)',
          lighter: 'rgb(51, 65, 85)',
        },
        border: {
          DEFAULT: withOpacity('--color-border'),
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        white: {
          DEFAULT: '#EBECEC',
          pure: '#FFFFFF',
        },
        black: {
          DEFAULT: '#000000',
        },
        grey: {
          DEFAULT: '#EBECEC4D',
          dark: '#646464',
          light: 'rgba(245, 245, 245, 0.5)',
        },
        green: {
          DEFAULT: '#01C36D',
          light: '#01C36D33',
          dark: '#1B3C37',
        },
        red: {
          DEFAULT: '#FF5863',
          light: '#FF586333',
          dark: '#4D2635',
        },
        yellow: {
          DEFAULT: '#ECC347',
          light: '#ECC34733',
        },
        blue: {
          DEFAULT: '#5698FF',
          light: '#5698FF63',
        },
        transparent: 'transparent',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      fontSize: {
        stat: ['2.5rem', { lineHeight: '3rem' }],
      },
      boxShadow: {
        card: '0 0 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 0 30px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-default': {
          '-ms-overflow-style': 'auto',
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        },
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(51, 65, 85)',
            borderRadius: '3px',
          },
        },
        '.glass-effect': {
          'backdrop-filter': 'blur(12px)',
          background: 'rgba(30, 41, 59, 0.7)',
        },
      });
    }),
  ],
};

export default config;
