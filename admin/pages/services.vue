<script setup lang="ts">
import type { ServiceImagesBySlug, ServiceSlug } from '@ads/shared'

// Слайдер главной + галереи под услугами. Тайтлы/тексты живут в коде фронта,
// тут только картинки.
const SECTIONS: { slug: ServiceSlug; title: string; description: string }[] = [
  {
    slug: 'hero',
    title: 'Фон главной (слайдер)',
    description:
      'Картинки фона за заголовком «Изготавливаем» на главной. Меняются автоматически раз в 5 секунд с плавным переходом. Если ничего не загружено — фон останется однотонным.',
  },
  { slug: 'signs', title: 'Вывески', description: '' },
  { slug: 'plaques', title: 'Таблички и стенды', description: '' },
  { slug: 'entry', title: 'Оформление входных групп', description: '' },
  { slug: 'complex', title: 'Комплексное оформление', description: '' },
]

const { data, refresh } = await useFetch<ServiceImagesBySlug>('/api/services')
const saving = ref<ServiceSlug | null>(null)
const error = ref<string | null>(null)

async function save(slug: ServiceSlug, imageUrls: string[]) {
  saving.value = slug
  error.value = null
  try {
    await $fetch(`/api/services/${slug}`, { method: 'PATCH', body: { imageUrls } })
    if (data.value) data.value[slug] = imageUrls
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка сохранения'
    await refresh()
  } finally {
    saving.value = null
  }
}
</script>

<template>
  <AdminShell>
    <h1 class="text-2xl font-bold mb-6">Услуги и фон главной</h1>
    <p class="text-sm text-ink-500 mb-6">
      Тайтлы и описания услуг живут в коде фронта. Здесь редактируются только картинки.
    </p>

    <div v-if="data" class="space-y-8">
      <section v-for="s in SECTIONS" :key="s.slug" class="card">
        <div class="flex items-baseline justify-between mb-2">
          <h2 class="text-lg font-bold">{{ s.title }}</h2>
          <span v-if="saving === s.slug" class="text-sm text-ink-500">Сохранение…</span>
        </div>
        <p v-if="s.description" class="text-sm text-ink-500 mb-4">{{ s.description }}</p>
        <ImageGallery
          :model-value="data[s.slug]"
          @update:model-value="(urls) => save(s.slug, urls)"
        />
      </section>
    </div>

    <p v-if="error" class="text-sm text-red-600 mt-4">{{ error }}</p>
  </AdminShell>
</template>
