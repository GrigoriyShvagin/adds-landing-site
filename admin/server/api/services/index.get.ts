import { prisma } from '~/server/utils/prisma'
import { SERVICE_SLUGS } from '~/server/utils/service-slugs'
import type { ServiceImagesBySlug } from '@ads/shared'

export default defineEventHandler(async () => {
  const rows = await prisma.serviceImage.findMany({
    orderBy: [{ slug: 'asc' }, { order: 'asc' }],
  })
  const result: ServiceImagesBySlug = { signs: [], plaques: [], entry: [], complex: [], poryadok: [], hero: [] }
  for (const r of rows) {
    if ((SERVICE_SLUGS as string[]).includes(r.slug)) {
      result[r.slug as keyof ServiceImagesBySlug].push(r.url)
    }
  }
  return result
})
