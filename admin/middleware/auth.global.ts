// Защищает все страницы кроме /login. На клиенте дёргает /api/auth/me.
export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login') return

  try {
    await $fetch('/api/auth/me')
  } catch {
    return navigateTo('/login')
  }
})
