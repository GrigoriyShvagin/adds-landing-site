import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400 })

  const body = await readBody<{
    customer?: string
    task?: string
    solution?: string
    order?: number
    imageUrls?: string[]
  }>(event)

  // Если передан imageUrls — пересоздаём набор картинок целиком (проще для UI).
  const updated = await prisma.$transaction(async (tx) => {
    const updateData: Record<string, unknown> = {}
    if (body.customer !== undefined) updateData.customer = body.customer
    if (body.task !== undefined) updateData.task = body.task
    if (body.solution !== undefined) updateData.solution = body.solution
    if (body.order !== undefined) updateData.order = body.order

    if (body.imageUrls) {
      await tx.portfolioImage.deleteMany({ where: { caseId: id } })
      await tx.portfolioImage.createMany({
        data: body.imageUrls.map((url, i) => ({ caseId: id, url, order: i })),
      })
    }

    return tx.portfolioCase.update({
      where: { id },
      data: updateData,
      include: { images: { orderBy: { order: 'asc' } } },
    })
  })

  return updated
})
