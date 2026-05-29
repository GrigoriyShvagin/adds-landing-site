import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { isServiceSlug } from '~/server/utils/service-slugs'

export default defineEventHandler(async (event) => {
  requireAuth(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug || !isServiceSlug(slug)) {
    throw createError({ statusCode: 400, statusMessage: 'Неизвестная услуга' })
  }

  const body = await readBody<{ imageUrls?: string[] }>(event)
  const urls = Array.isArray(body.imageUrls) ? body.imageUrls : []

  await prisma.$transaction(async (tx) => {
    await tx.serviceImage.deleteMany({ where: { slug } })
    if (urls.length) {
      await tx.serviceImage.createMany({
        data: urls.map((url, i) => ({ slug, url, order: i })),
      })
    }
  })

  return { slug, imageUrls: urls }
})
