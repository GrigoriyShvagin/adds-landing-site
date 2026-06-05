export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
    publicOrigin: process.env.PUBLIC_ORIGIN || 'http://localhost:3000',
    public: {
      apiBase: '/api',
    },
  },
  nitro: {
    publicAssets: [
      {
        baseURL: '/uploads',
        dir: '/opt/adds-landing-site/admin/uploads',
        maxAge: 60 * 60 * 24,
      },
    ],
  },
  app: {
    head: {
      title: 'Админ-панель',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-icon.png' },
      ],
    },
  },
})
