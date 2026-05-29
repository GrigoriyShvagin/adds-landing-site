import { requireAuth } from '~/server/utils/auth'
import { writeFile, mkdir } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { randomBytes } from 'node:crypto'

const UPLOAD_DIR = resolve(process.cwd(), 'uploads')
const ALLOWED = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'])

export default defineEventHandler(async (event) => {
  requireAuth(event)

  const form = await readMultipartFormData(event)
  if (!form?.length) throw createError({ statusCode: 400, statusMessage: 'Файл не передан' })

  await mkdir(UPLOAD_DIR, { recursive: true })

  const urls: string[] = []
  for (const part of form) {
    if (!part.filename || !part.data) continue
    const ext = extname(part.filename).toLowerCase()
    if (!ALLOWED.has(ext)) {
      throw createError({ statusCode: 400, statusMessage: `Расширение ${ext} не поддерживается` })
    }
    const safeName = `${Date.now()}-${randomBytes(6).toString('hex')}${ext}`
    await writeFile(resolve(UPLOAD_DIR, safeName), part.data)
    urls.push(`/uploads/${safeName}`)
  }

  if (!urls.length) throw createError({ statusCode: 400, statusMessage: 'Нет валидных файлов' })
  return { urls }
})
