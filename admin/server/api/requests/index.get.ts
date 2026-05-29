import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  return prisma.contactRequest.findMany({ orderBy: { createdAt: 'desc' } })
})
