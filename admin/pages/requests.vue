<script setup lang="ts">
import type { ContactRequest } from '@ads/shared'

const { data: requests, refresh } = await useFetch<ContactRequest[]>('/api/requests')

async function remove(id: number) {
  if (!confirm('Удалить заявку?')) return
  await $fetch(`/api/requests/${id}`, { method: 'DELETE' })
  await refresh()
}

function fmt(date: string) {
  return new Date(date).toLocaleString('ru-RU')
}
</script>

<template>
  <AdminShell>
    <h1 class="text-2xl font-bold mb-6">Заявки</h1>

    <div v-if="!requests?.length" class="card text-ink-600/70">Заявок пока нет.</div>

    <table v-else class="w-full card">
      <thead class="text-left text-sm text-ink-600/70">
        <tr>
          <th class="pb-3">Дата</th>
          <th class="pb-3">Имя</th>
          <th class="pb-3">Телефон</th>
          <th class="pb-3">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in requests" :key="r.id" class="border-t border-ink-600/10">
          <td class="py-3 text-sm">{{ fmt(r.createdAt) }}</td>
          <td class="py-3 font-medium">{{ r.name }}</td>
          <td class="py-3">
            <a :href="`tel:${r.phone}`" class="text-accent hover:underline">{{ r.phone }}</a>
          </td>
          <td class="py-3 text-sm">{{ r.email || '—' }}</td>
          <td class="py-3 text-right">
            <button class="btn-danger" @click="remove(r.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </AdminShell>
</template>
