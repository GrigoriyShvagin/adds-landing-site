// Интерактивный CLI для создания админа.
// Запуск: npm run create-admin
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const prisma = new PrismaClient()

async function main() {
  const rl = readline.createInterface({ input, output })
  console.log('\n=== Создание нового админа ===\n')

  const email = (await rl.question('Email: ')).trim().toLowerCase()
  if (!email.includes('@')) {
    console.error('Некорректный email')
    process.exit(1)
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.error(`Пользователь с email ${email} уже существует`)
    process.exit(1)
  }

  const password = (await rl.question('Пароль (минимум 6 символов): ')).trim()
  if (password.length < 6) {
    console.error('Пароль должен быть минимум 6 символов')
    process.exit(1)
  }

  rl.close()

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, passwordHash },
  })

  console.log(`\nГотово. Создан админ #${user.id} (${user.email})\n`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
