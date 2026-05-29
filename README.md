# Реклама в городе — лендинг + админ-панель

Монорепо для сайта рекламной компании. Два Nuxt-приложения и общие TypeScript-типы.

## Что внутри

```
ads-landing-site/
├── frontend/   # Публичный сайт по макету (Nuxt 3 SSR)
├── admin/      # Админ-панель + API (Nuxt 3 + Prisma + SQLite)
├── shared/     # Общие TS-типы (PortfolioCase, ContactRequest, …)
├── package.json    # npm workspaces
└── README.md
```

| Приложение | Порт | Назначение |
|---|---|---|
| `frontend` | `:3000` | Открывают посетители. Тянет портфолио и шлёт заявки в `admin` |
| `admin` | `:3001` | UI админки + REST API + статика загруженных картинок |

---

## Архитектурные решения и почему так

| Решение | Альтернатива | Почему так |
|---|---|---|
| **Admin совмещён с API** | Отдельный backend-сервис | Меньше движущихся частей. Nitro (бэк Nuxt) умеет всё что нужно: роуты, файлы, статика |
| **SQLite + Prisma** | PostgreSQL | Объём данных мизерный (десятки кейсов, сотни заявок). SQLite = один файл, ноль конфигурации. Если вырастем — `provider = "postgresql"` в schema и `migrate`, схема та же |
| **Картинки на диск (`uploads/`)** | S3/Cloudinary | Один админский сервер хостит и UI, и файлы. Бэкап = `cp -r uploads/`. При переезде в облако — поменять `upload.post.ts` |
| **JWT в httpOnly cookie** | LocalStorage / сессии в БД | Нет XSS-кражи токена; без хранения сессий на сервере |
| **Услуги/статистика/контакты захардкожены** | Хранить в БД | Эти блоки меняются раз в год. Тащить ради них Prisma-модели и формы — overkill. Меняются прямо в коде лендинга |

### Что редактируется через админку, что нет

| Что | Где живёт |
|---|---|
| Кейсы портфолио (заказчик, задача, решение, картинки) | БД, CRUD из админки |
| Заявки с формы | БД, просмотр из админки |
| Админы (логин/пароль) | БД, создаются CLI `npm run create-admin` |
| Hero «Изготавливаем» + список направлений | `frontend/components/HeroSection.vue` |
| Статистика 21 год / 10 000+ / 100+ | `frontend/components/StatsSection.vue` |
| 4 секции услуг (описания) | `frontend/pages/uslugi.vue` |
| 5 шагов порядка работы | `frontend/pages/poryadok.vue` |
| Телефон, соцсети, логотипы клиентов | `frontend/components/ContactForm.vue`, `ClientsSection.vue` |

---

## Дизайн-система

Единые токены, синхронизированы в `frontend/tailwind.config.ts` и `admin/tailwind.config.ts`.
**При правке — менять в обоих файлах.**

### Цвета

| Токен | HEX | Где применяется |
|---|---|---|
| `ink.900` | `#0E0530` | Тёмный hover, тени |
| `ink.800` | `#15083F` | Сайдбар админки, фон login |
| `ink.700` | `#1F0A4B` | **Основной фиолетовый фон сайта** |
| `ink.600` | `#2D1A66` | Бордеры, разделители |
| `ink.500` | `#3D2A85` | Светлый акцент по фиолетовому |
| `accent` | `#2B4FDB` | **Синяя полоса со статистикой**, акценты ссылок |
| `accent.dark` | `#1F3CB0` | Hover для accent |
| `placeholder` | `#D9D9D9` | Серые заглушки картинок (когда нет фото) |
| `surface` | `#F4F5FA` | Фон админки (светлый) |

Использование в Tailwind: `bg-ink-700`, `text-accent`, `border-ink-600/20` (с прозрачностью).

### Типографика

- **Шрифт:** [Manrope](https://fonts.google.com/specimen/Manrope) (400, 500, 600, 700, 800). Подгружается с Google Fonts в `assets/css/main.css`
- **Шкала** (`frontend/tailwind.config.ts → theme.extend.fontSize`):
  - `text-display` — 72px / 1.1 / 800. Hero «Изготавливаем»
  - `text-h2` — 44px / 1.15 / 700. Заголовки секций («Готовые проекты», «Наши клиенты»)
  - `text-h3` — 24px / 1.3 / 700. Имена кейсов, подзаголовки
  - Базовый текст — `text-base` (16px) от Tailwind

### Радиусы и отступы

- `rounded-card` = 16px — карточки портфолио, заглушки картинок
- `rounded-full` — круглые кнопки/бэйджи (CTA «Связаться с нами», соцсети)
- `max-w-shell` = 1320px + `px-8` — внутренний контейнер (используется через класс `.shell`)

### Компоненты-классы (`assets/css/main.css`)

| Класс | Назначение |
|---|---|
| `.shell` | Контейнер фиксированной ширины с горизонтальными отступами |
| `.nav-link` | Ссылки в шапке |
| `.btn-primary` | Чёрная закруглённая CTA-кнопка |
| `.form-input` | Поля формы заявки (прозрачные с нижней границей) |
| `.placeholder-img` | Серая заглушка `#D9D9D9` со скруглением `card` |
| `.card` (admin) | Белая карточка админки с тенью |
| `.input` (admin) | Стандартное поле ввода в админке |

---

## Запуск

### Зависимости (один раз)

```bash
cd ads-landing-site
npm install
```

### Настройка БД (один раз)

```bash
cd admin
cp .env.example .env
# открой .env и поменяй JWT_SECRET на длинную случайную строку

npx prisma migrate dev --name init
```

Создаст `admin/prisma/dev.db` и применит миграции.

### Создать первого админа

```bash
# из корня монорепо
npm run create-admin
```

Введёт email / имя / пароль интерактивно.

### Dev (два терминала)

```bash
# терминал 1 — админка + API
npm run dev:admin     # http://localhost:3001

# терминал 2 — лендинг
npm run dev:frontend  # http://localhost:3000
```

Лендинг ходит за данными в `http://localhost:3001` (см. `frontend/nuxt.config.ts → runtimeConfig.public.adminApiBase`). На проде поменять на реальный домен админки.

### Полезные команды

| Команда | Что делает |
|---|---|
| `npm run db:migrate` | Создать новую миграцию (после правок `schema.prisma`) |
| `npm run db:studio` | GUI для просмотра/правки БД (Prisma Studio) |
| `npm run build:frontend` | Прод-сборка лендинга |
| `npm run build:admin` | Прод-сборка админки |

---

## API (что отдаёт admin)

### Публичные (без авторизации) — для лендинга

| Метод | Путь | Тело | Ответ |
|---|---|---|---|
| `GET` | `/api/portfolio` | — | `PortfolioCase[]` |
| `POST` | `/api/requests` | `{ name, phone }` | `{ id }` |

### Приватные (нужна cookie `admin_token`)

| Метод | Путь | Что делает |
|---|---|---|
| `POST` | `/api/auth/login` | `{ email, password }` → ставит cookie |
| `POST` | `/api/auth/logout` | сбрасывает cookie |
| `GET` | `/api/auth/me` | текущий админ |
| `GET` | `/api/portfolio/:id` | один кейс |
| `POST` | `/api/portfolio` | создать кейс |
| `PATCH` | `/api/portfolio/:id` | обновить кейс |
| `DELETE` | `/api/portfolio/:id` | удалить кейс |
| `GET` | `/api/requests` | список заявок |
| `DELETE` | `/api/requests/:id` | удалить заявку |
| `POST` | `/api/upload` | multipart, поле `files` → `{ urls: string[] }` |

---

## Структура данных

```prisma
User {
  id, email (unique), passwordHash, name, createdAt
}

PortfolioCase {
  id, customer, task, solution, order, createdAt
  images: PortfolioImage[]
}

PortfolioImage {
  id, url, order, caseId → PortfolioCase
}

ContactRequest {
  id, name, phone, createdAt
}
```

Связь `PortfolioCase → PortfolioImage` с `onDelete: Cascade`: удаление кейса автоматически чистит привязанные картинки в БД (файлы на диске остаются — почистить по необходимости вручную).

---

## Деплой (вкратце)

1. Поднять Node 20+ на VPS
2. `npm install && npm run build:admin && npm run build:frontend`
3. Запустить через PM2 / systemd: `node admin/.output/server/index.mjs` + `node frontend/.output/server/index.mjs`
4. Nginx как reverse proxy: `site.ru` → `:3000`, `admin.site.ru` → `:3001`
5. Бэкап = ежедневная копия `admin/prisma/dev.db` + `admin/uploads/`

---

## Что НЕ сделано (намеренно, можно добавить потом)

- Адаптив под мобилку (макет десктоп-only)
- Реальные SVG-логотипы клиентов (сейчас текстовые плашки) — положить в `frontend/public/clients/` и заменить в `ClientsSection.vue`
- Реальные фото в плейсхолдерах услуг — добавить в `frontend/public/services/`
- Pagination на заявках (если будет >100)
- Email-уведомление админу о новой заявке
