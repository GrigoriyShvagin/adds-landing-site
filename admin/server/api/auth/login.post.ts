import { prisma } from '~/server/utils/prisma'
import { verifyPassword, signToken, setAuthCookie } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)
  const email = body.email?.toLowerCase().trim()
  const password = body.password

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email и пароль обязательны' })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный email или пароль' })
  }

  const token = signToken({ userId: user.id, email: user.email })
  setAuthCookie(event, token)

  return { id: user.id, email: user.email }
})
