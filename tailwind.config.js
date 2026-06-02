/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#101828',
          900: '#182230',
          800: '#253347',
          700: '#344054',
        },
        ujima: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#12b76a',
          600: '#039855',
          700: '#027a48',
        },
        gold: {
          100: '#fef0c7',
          500: '#f79009',
          700: '#b54708',
        },
      },
      boxShadow: {
        soft: '0 14px 36px rgba(16, 24, 40, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
