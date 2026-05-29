<script setup lang="ts">
import type { PortfolioCase } from '@ads/shared'

const { data: cases, refresh } = await useFetch<PortfolioCase[]>('/api/portfolio')

async function remove(id: number) {
  if (!confirm('Удалить кейс?')) return
  await $fetch(`/api/portfolio/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <AdminShell>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Портфолио</h1>
      <NuxtLink to="/portfolio/new" class="btn-primary">+ Добавить кейс</NuxtLink>
    </div>

    <div v-if="!cases?.length" class="card text-ink-600/70">Кейсов пока нет.</div>

    <div v-else class="space-y-3">
      <div
        v-for="c in cases"
        :key="c.id"
        class="card flex items-center gap-4"
      >
        <div class="flex -space-x-2">
          <img
            v-for="img in c.images.slice(0, 3)"
            :key="img.id"
            :src="img.url"
            class="w-12 h-12 rounded-lg object-cover border-2 border-white"
            alt=""
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-semibold truncate">{{ c.customer }}</div>
          <div class="text-sm text-ink-600/70 truncate">{{ c.task }}</div>
        </div>
        <NuxtLink :to="`/portfolio/${c.id}`" class="btn-primary">Редактировать</NuxtLink>
        <button class="btn-danger" @click="remove(c.id)">Удалить</button>
      </div>
    </div>
  </AdminShell>
</template>
