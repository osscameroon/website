import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxWidth: { container: '1160px' },
      colors: {
        blue: { DEFAULT: '#3B76EF', dark: '#2C5FD0', deep: '#1B3F8F', 50: '#E8EFFD', 100: '#DDE8FC', 200: '#B7CCF7' },
        navy: '#151E2D', ink: { DEFAULT: '#101828', 70: '#344054' }, muted: { DEFAULT: '#4B5565', alt: '#5A6473' },
        border: { DEFAULT: '#E4E7EC', soft: '#EEF1F5' }, grey: { 50: '#F7F8FA', 100: '#F2F4F7' },
        'muted-light': { 1: '#667085', 2: '#98A2B3', 3: '#C3C9D4', 4: '#8D95A3', 5: '#A6AEBC', 6: '#D0D5DD', 7: '#EAECF0' }
      },
      borderRadius: { btn: '8px', input: '10px', card: '14px', modal: '16px', support: '18px', pill: '100px' },
      boxShadow: {
        rest: '0 2px 10px rgba(16,24,40,.08)', hover: '0 14px 34px rgba(16,24,40,.16)', search: '0 8px 28px rgba(16,24,40,.08)', modal: '0 24px 70px rgba(16,24,40,.28)', button: '0 2px 10px rgba(59,118,239,.28)'
      },
      keyframes: {
        floatUp: { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } }
      },
      animation: { floatUp: 'floatUp .4s ease both', bob: 'bob 6s ease-in-out infinite' }
    },
  },
  plugins: [],
};
export default config;
