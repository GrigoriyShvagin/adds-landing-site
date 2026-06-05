// Типы, общие для frontend и admin. Соответствуют моделям Prisma.

export interface PortfolioImage {
  id: number
  url: string
  order: number
}

export interface PortfolioCase {
  id: number
  customer: string
  task: string
  solution: string
  order: number
  createdAt: string
  images: PortfolioImage[]
}

export interface ContactRequest {
  id: number
  name: string
  phone: string
  email?: string
  createdAt: string
}

export interface ContactRequestInput {
  name: string
  phone: string
  email?: string
}

export interface AdminUser {
  id: number
  email: string
}

// Картиночные секции лендинга, редактируемые из админки.
// signs/plaques/entry/complex — галереи на /uslugi, poryadok — одна картинка на /poryadok,
// hero — фоновый слайдер в шапке главной (меняется раз в 5 секунд с crossfade).
export type ServiceSlug = 'signs' | 'plaques' | 'entry' | 'complex' | 'poryadok' | 'hero'

export interface ServiceImagesBySlug {
  signs: string[]
  plaques: string[]
  entry: string[]
  complex: string[]
  poryadok: string[]
  hero: string[]
}
