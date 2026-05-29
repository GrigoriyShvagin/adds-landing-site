import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { userId } = requireAuth(event)
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw createError({ statusCode: 401 })
  return { id: user.id, email: user.email }
})
