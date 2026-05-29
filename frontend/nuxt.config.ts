export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // URL админки/API. На проде — поменять на реальный домен.
      adminApiBase: process.env.ADMIN_API_BASE || 'http://localhost:3001',
    },
  },
  app: {
    head: {
      title: 'Реклама в городе — изготовление вывесок, табличек и оформление',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Изготавливаем вывески, таблички, оформление входных групп и комплексное оформление с 2005 года. 10 000+ проектов.',
        },
      ],
    },
  },
})
