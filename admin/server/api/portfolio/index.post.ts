import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const body = await readBody<{
    customer: string
    task: string
    solution: string
    order?: number
    imageUrls?: string[]
  }>(event)

  if (!body.customer || !body.task || !body.solution) {
    throw createError({ statusCode: 400, statusMessage: 'customer, task и solution обязательны' })
  }

  const created = await prisma.portfolioCase.create({
    data: {
      customer: body.customer,
      task: body.task,
      solution: body.solution,
      order: body.order ?? 0,
      images: body.imageUrls?.length
        ? { create: body.imageUrls.map((url, i) => ({ url, order: i })) }
        : undefined,
    },
    include: { images: true },
  })
  return created
})
