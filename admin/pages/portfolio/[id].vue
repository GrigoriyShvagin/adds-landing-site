<script setup lang="ts">
import type { PortfolioCase } from '@ads/shared'

const route = useRoute()
const id = Number(route.params.id)
const { data: item } = await useFetch<PortfolioCase>(`/api/portfolio/${id}`)

function onSaved() {
  navigateTo('/portfolio')
}
</script>

<template>
  <AdminShell>
    <h1 class="text-2xl font-bold mb-6">Кейс #{{ id }}</h1>
    <PortfolioForm v-if="item" :initial="item" @saved="onSaved" />
  </AdminShell>
</template>
