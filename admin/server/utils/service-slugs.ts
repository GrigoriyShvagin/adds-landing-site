import type { ServiceSlug } from '@ads/shared'

export const SERVICE_SLUGS: ServiceSlug[] = ['signs', 'plaques', 'entry', 'complex', 'poryadok', 'hero']

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as string[]).includes(value)
}
