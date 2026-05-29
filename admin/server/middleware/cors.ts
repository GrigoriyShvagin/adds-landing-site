// Разрешаем фронту дёргать публичные эндпоинты (создание заявки + список портфолио).
// Для остальных запросов CORS неактивен — админка ходит к самому себе.
export default defineEventHandler((event) => {
  const origin = useRuntimeConfig().publicOrigin
  const requestOrigin = getHeader(event, 'origin')

  if (requestOrigin && requestOrigin === origin) {
    setHeader(event, 'Access-Control-Allow-Origin', origin)
    setHeader(event, 'Access-Control-Allow-Credentials', 'true')
    setHeader(event, 'Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type')
  }

  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.end()
  }
})
