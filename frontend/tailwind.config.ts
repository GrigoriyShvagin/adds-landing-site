import type { Config } from 'tailwindcss'

// Дизайн-система лендинга. Те же токены, что в админке — синхронизировать вручную.
export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Основной фиолетовый фон сайта
        ink: {
          900: '#0E0530',
          800: '#15083F',
          700: '#1F0A4B',  // base background
          600: '#2D1A66',
          500: '#3D2A85',
        },
        // Акцентный синий (полоса со статистикой)
        accent: {
          DEFAULT: '#2B4FDB',
          dark: '#1F3CB0',
        },
        // Серый placeholder для будущих картинок
        placeholder: '#D9D9D9',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Шкала из Figma
        'display': ['80px', { lineHeight: '1.1', fontWeight: '600' }],
        'h2': ['44px', { lineHeight: '1.15', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'lead': ['36px', { lineHeight: '1', fontWeight: '400' }],
        'body-lg': ['24px', { lineHeight: '1.4', fontWeight: '400' }],
        'body': ['20px', { lineHeight: '1.35', fontWeight: '400' }],
        'caption': ['18px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      maxWidth: {
        'shell': '1320px', // ширина внутреннего контейнера
      },
      borderRadius: {
        'card': '16px',
      },
    },
  },
  plugins: [],
}
