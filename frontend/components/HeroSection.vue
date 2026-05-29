<script setup lang="ts">
const services = [
  'Вывески',
  'Таблички и стенды',
  'Оформление входных групп',
  'Комплексное оформление',
]
</script>

<template>
  <section class="shell pt-36 pb-12">
    <h1 class="text-display tracking-tight">Изготавливаем</h1>
    <ul class="mt-4 space-y-2 text-lead text-white/80">
      <li v-for="s in services" :key="s">{{ s }}</li>
    </ul>
  </section>
</template>
