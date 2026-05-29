import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import type { H3Event } from 'h3'
import { getCookie, createError } from 'h3'

const COOKIE_NAME = 'admin_token'
const TOKEN_TTL = '7d'

export interface TokenPayload {
  userId: number
  email: string
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: TokenPayload): string {
  const secret = useRuntimeConfig().jwtSecret
  return jwt.sign(payload, secret, { expiresIn: TOKEN_TTL })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const secret = useRuntimeConfig().jwtSecret
    return jwt.verify(token, secret) as TokenPayload
  } catch {
    return null
  }
}

export function setAuthCookie(event: H3Event, token: string) {
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function clearAuthCookie(event: H3Event) {
  deleteCookie(event, COOKIE_NAME, { path: '/' })
}

export function requireAuth(event: H3Event): TokenPayload {
  const token = getCookie(event, COOKIE_NAME)
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }
  const payload = verifyToken(token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
  return payload
}
