<script setup lang="ts">
import type { ServiceImagesBySlug } from '@ads/shared'

const { data, refresh } = await useFetch<ServiceImagesBySlug>('/api/services')
const current = computed(() => data.value?.poryadok[0] ?? null)

const uploading = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

async function save(imageUrls: string[]) {
  saving.value = true
  error.value = null
  try {
    await $fetch('/api/services/poryadok', { method: 'PATCH', body: { imageUrls } })
    if (data.value) data.value.poryadok = imageUrls
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка сохранения'
    await refresh()
  } finally {
    saving.value = false
  }
}

async function onFile(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  uploading.value = true
  error.value = null
  try {
    const fd = new FormData()
    fd.append('files', input.files[0])
    const res = await $fetch<{ urls: string[] }>('/api/upload', { method: 'POST', body: fd })
    await save([res.urls[0]])
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка загрузки'
  } finally {
    uploading.value = false
    input.value = ''
  }
}

async function remove() {
  await save([])
}
</script>

<template>
  <AdminShell>
    <h1 class="text-2xl font-bold mb-6">Порядок работы</h1>
    <p class="text-sm text-ink-500 mb-6">
      Одна картинка справа от списка шагов на странице «Порядок работы».
      Если ничего не загружено — на сайте показывается белая заглушка.
    </p>

    <div class="card max-w-2xl">
      <div class="aspect-[718/482] bg-ink-100 rounded-lg overflow-hidden mb-4">
        <img v-if="current" :src="current" class="w-full h-full object-cover" alt="" />
      </div>
      <div class="flex gap-3 items-center">
        <label class="btn-primary cursor-pointer">
          <input type="file" accept="image/*" class="hidden" @change="onFile" :disabled="uploading || saving" />
          {{ uploading ? 'Загрузка…' : current ? 'Заменить' : 'Загрузить' }}
        </label>
        <button
          v-if="current"
          type="button"
          class="btn bg-red-600 text-white px-4 py-2"
          :disabled="saving"
          @click="remove"
        >
          Удалить
        </button>
        <span v-if="saving" class="text-sm text-ink-500">Сохранение…</span>
      </div>
      <p v-if="error" class="text-sm text-red-600 mt-3">{{ error }}</p>
    </div>
  </AdminShell>
</template>
