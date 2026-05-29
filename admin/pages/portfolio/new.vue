<script setup lang="ts">
function onSaved() {
  navigateTo('/portfolio')
}
</script>

<template>
  <AdminShell>
    <h1 class="text-2xl font-bold mb-6">Новый кейс</h1>
    <PortfolioForm @saved="onSaved" />
  </AdminShell>
</template>
