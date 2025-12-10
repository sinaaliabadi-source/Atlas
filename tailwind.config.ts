import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#0ea5e9',
        accent: '#a855f7',
      },
      fontFamily: {
        yekan: ['YekanBakh', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
