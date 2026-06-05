<script setup lang="ts">
const services = [
  'Вывески',
  'Таблички и стенды',
  'Оформление входных групп',
  'Комплексное оформление',
]
</script>

<template>
  <section class="flex-1 w-full">
    <div class="shell pt-16 sm:pt-24 lg:pt-36 pb-8 sm:pb-10 lg:pb-12">
      <h1 class="text-display tracking-tight">Изготавливаем</h1>
      <ul class="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-lead text-white/80">
        <li v-for="s in services" :key="s">{{ s }}</li>
      </ul>
    </div>
  </section>
</template>
