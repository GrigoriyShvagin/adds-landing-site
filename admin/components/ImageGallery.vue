<script setup lang="ts">
const props = defineProps<{ modelValue: string[] }>()
const emit = defineEmits<{ 'update:modelValue': [string[]] }>()

const uploading = ref(false)
const error = ref<string | null>(null)

function set(urls: string[]) {
  emit('update:modelValue', urls)
}

async function onFiles(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  uploading.value = true
  error.value = null
  try {
    const fd = new FormData()
    for (const f of input.files) fd.append('files', f)
    const res = await $fetch<{ urls: string[] }>('/api/upload', { method: 'POST', body: fd })
    set([...props.modelValue, ...res.urls])
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка загрузки'
  } finally {
    uploading.value = false
    input.value = ''
  }
}

function remove(i: number) {
  const next = [...props.modelValue]
  next.splice(i, 1)
  set(next)
}

function move(i: number, dir: -1 | 1) {
  const j = i + dir
  if (j < 0 || j >= props.modelValue.length) return
  const next = [...props.modelValue]
  ;[next[i], next[j]] = [next[j], next[i]]
  set(next)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium">Картинки ({{ modelValue.length }})</span>
      <label class="btn-primary cursor-pointer">
        <input type="file" multiple accept="image/*" class="hidden" @change="onFiles" :disabled="uploading" />
        {{ uploading ? 'Загрузка…' : 'Добавить' }}
      </label>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <div v-for="(url, i) in modelValue" :key="url" class="relative group">
        <img :src="url" class="w-full aspect-square object-cover rounded-lg" alt="" />
        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex flex-col items-center justify-center gap-1 text-white text-xs">
          <div class="flex gap-1">
            <button type="button" class="bg-white/20 px-2 py-1 rounded" @click="move(i, -1)">←</button>
            <button type="button" class="bg-white/20 px-2 py-1 rounded" @click="move(i, 1)">→</button>
          </div>
          <button type="button" class="bg-red-600 px-2 py-1 rounded" @click="remove(i)">Удалить</button>
        </div>
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-600 mt-2">{{ error }}</p>
  </div>
</template>
