/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        goa: {
          orange: '#FF6B35',
          blue: '#004E89',
          purple: '#9B59B6',
          sunset: '#FF8C42',
          ocean: '#1A5F7A',
        },
      },
      backgroundImage: {
        'goa-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 25%, #9B59B6 50%, #004E89 75%, #1A5F7A 100%)',
        'goa-gradient-reverse': 'linear-gradient(135deg, #1A5F7A 0%, #004E89 25%, #9B59B6 50%, #FF8C42 75%, #FF6B35 100%)',
        'goa-radial': 'radial-gradient(circle at 50% 50%, #FF6B35, #9B59B6, #004E89)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
