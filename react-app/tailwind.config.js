/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // React 컴포넌트 파일 경로
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        /* https://tailwindcss.com/docs/customizing-colors */
      },
    },
  },
  plugins: [],
};
