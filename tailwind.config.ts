import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        onyx: '#0A0A0A',
        platinum: '#E5E5E5',
        teal: '#00C2B2',
        porcelain: '#FFFFFF',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        poppins: ['var(--font-poppins)'],
      },
      boxShadow: {
        glass: '0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
      }
    },
  },
  plugins: [],
};
export default config;