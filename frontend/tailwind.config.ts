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
        // Шкала из Figma — fluid с clamp(min, vw, max) чтобы плавно ужиматься на мобилке.
        'display': ['clamp(40px, 8vw, 80px)', { lineHeight: '1.1', fontWeight: '600' }],
        'h2': ['clamp(28px, 4.4vw, 44px)', { lineHeight: '1.15', fontWeight: '700' }],
        'h3': ['clamp(20px, 2.4vw, 24px)', { lineHeight: '1.3', fontWeight: '700' }],
        'lead': ['clamp(22px, 3.8vw, 36px)', { lineHeight: '1.15', fontWeight: '400' }],
        'body-lg': ['clamp(16px, 2.2vw, 24px)', { lineHeight: '1.45', fontWeight: '400' }],
        'body': ['clamp(15px, 1.7vw, 20px)', { lineHeight: '1.4', fontWeight: '400' }],
        'caption': ['clamp(14px, 1.6vw, 18px)', { lineHeight: '1.4', fontWeight: '400' }],
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
