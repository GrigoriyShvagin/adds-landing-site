// Публичный эндпоинт: список кейсов для лендинга. Без авторизации.
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const cases = await prisma.portfolioCase.findMany({
    orderBy: { order: 'asc' },
    include: { images: { orderBy: { order: 'asc' } } },
  })
  return cases
})
