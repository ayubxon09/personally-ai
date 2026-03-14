/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50:  '#f8f8f8',
          100: '#e8e8e8',
          200: '#c0c0c0',
          300: '#a0a0a0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#2a2a2a',
          800: '#1a1a1a',
          900: '#0f0f0f',
          950: '#080808',
        },
        accent: {
          DEFAULT: '#7c6ef5',
          hover:   '#6a5ee0',
          light:   '#a89ef8',
          dim:     '#3d3680',
        },
        green: {
          ai: '#22c55e',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-in-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'typing':     'typing 1.2s steps(3) infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      }
    },
  },
  plugins: [],
}
