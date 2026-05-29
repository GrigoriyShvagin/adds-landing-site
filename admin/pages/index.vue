<script setup lang="ts">
const { data: cases } = await useFetch('/api/portfolio')
const { data: requests } = await useFetch('/api/requests')
</script>

<template>
  <AdminShell>
    <h1 class="text-2xl font-bold mb-6">Дашборд</h1>
    <div class="grid grid-cols-2 gap-6">
      <NuxtLink to="/portfolio" class="card hover:shadow-md transition">
        <div class="text-sm text-ink-600/70">Кейсов в портфолио</div>
        <div class="text-4xl font-bold mt-2">{{ cases?.length ?? 0 }}</div>
      </NuxtLink>
      <NuxtLink to="/requests" class="card hover:shadow-md transition">
        <div class="text-sm text-ink-600/70">Заявок</div>
        <div class="text-4xl font-bold mt-2">{{ requests?.length ?? 0 }}</div>
      </NuxtLink>
    </div>
  </AdminShell>
</template>
