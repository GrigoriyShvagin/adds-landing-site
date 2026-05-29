// Публичный эндпоинт: форма с лендинга отправляет сюда. Без авторизации.
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string; phone?: string }>(event)
  const name = body.name?.trim()
  const phone = body.phone?.trim()

  if (!name || !phone) {
    throw createError({ statusCode: 400, statusMessage: 'Имя и телефон обязательны' })
  }
  if (name.length > 100 || phone.length > 50) {
    throw createError({ statusCode: 400, statusMessage: 'Слишком длинные значения' })
  }

  const created = await prisma.contactRequest.create({ data: { name, phone } })
  return { id: created.id }
})
