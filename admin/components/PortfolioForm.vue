<script setup lang="ts">
import type { PortfolioCase } from '@ads/shared'

const props = defineProps<{ initial?: PortfolioCase | null }>()
const emit = defineEmits<{ saved: [PortfolioCase] }>()

const customer = ref(props.initial?.customer ?? '')
const task = ref(props.initial?.task ?? '')
const solution = ref(props.initial?.solution ?? '')
const order = ref(props.initial?.order ?? 0)
const imageUrls = ref<string[]>(props.initial?.images.map((i) => i.url) ?? [])

const uploading = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

async function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  uploading.value = true
  error.value = null
  try {
    const fd = new FormData()
    for (const f of input.files) fd.append('files', f)
    const res = await $fetch<{ urls: string[] }>('/api/upload', { method: 'POST', body: fd })
    imageUrls.value.push(...res.urls)
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка загрузки'
  } finally {
    uploading.value = false
    input.value = ''
  }
}

function removeImage(i: number) {
  imageUrls.value.splice(i, 1)
}

function moveImage(i: number, dir: -1 | 1) {
  const j = i + dir
  if (j < 0 || j >= imageUrls.value.length) return
  ;[imageUrls.value[i], imageUrls.value[j]] = [imageUrls.value[j], imageUrls.value[i]]
}

async function save() {
  saving.value = true
  error.value = null
  try {
    const body = {
      customer: customer.value,
      task: task.value,
      solution: solution.value,
      order: order.value,
      imageUrls: imageUrls.value,
    }
    const result = props.initial
      ? await $fetch<PortfolioCase>(`/api/portfolio/${props.initial.id}`, { method: 'PATCH', body })
      : await $fetch<PortfolioCase>('/api/portfolio', { method: 'POST', body })
    emit('saved', result)
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка сохранения'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <form class="card space-y-4 max-w-3xl" @submit.prevent="save">
    <label class="block">
      <span class="text-sm font-medium">Заказчик</span>
      <input v-model="customer" class="input mt-1" required />
    </label>
    <label class="block">
      <span class="text-sm font-medium">Задача клиента</span>
      <textarea v-model="task" class="input mt-1" rows="3" required />
    </label>
    <label class="block">
      <span class="text-sm font-medium">Решение</span>
      <textarea v-model="solution" class="input mt-1" rows="3" required />
    </label>
    <label class="block w-32">
      <span class="text-sm font-medium">Порядок</span>
      <input v-model.number="order" type="number" class="input mt-1" />
    </label>

    <div>
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium">Картинки ({{ imageUrls.length }})</span>
        <label class="btn-primary cursor-pointer">
          <input type="file" multiple accept="image/*" class="hidden" @change="onFiles" :disabled="uploading" />
          {{ uploading ? 'Загрузка…' : 'Добавить' }}
        </label>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <div v-for="(url, i) in imageUrls" :key="url" class="relative group">
          <img :src="url" class="w-full aspect-square object-cover rounded-lg" alt="" />
          <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex flex-col items-center justify-center gap-1 text-white text-xs">
            <div class="flex gap-1">
              <button type="button" class="bg-white/20 px-2 py-1 rounded" @click="moveImage(i, -1)">←</button>
              <button type="button" class="bg-white/20 px-2 py-1 rounded" @click="moveImage(i, 1)">→</button>
            </div>
            <button type="button" class="bg-red-600 px-2 py-1 rounded" @click="removeImage(i)">Удалить</button>
          </div>
        </div>
      </div>
    </div>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <button class="btn-primary" :disabled="saving">{{ saving ? 'Сохранение…' : 'Сохранить' }}</button>
  </form>
</template>
