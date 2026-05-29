import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0E0530',
          800: '#15083F',
          700: '#1F0A4B',
          600: '#2D1A66',
          500: '#3D2A85',
        },
        accent: {
          DEFAULT: '#2B4FDB',
          dark: '#1F3CB0',
        },
        surface: '#F4F5FA',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
