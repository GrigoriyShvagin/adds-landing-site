<script setup lang="ts">
const nav = [
  { label: 'Услуги', to: '/uslugi' },
  { label: 'Портфолио', to: '/portfolio' },
  { label: 'Порядок работы', to: '/poryadok' },
  { label: 'Рассчитать стоимость', to: '/#contact' },
  { label: 'Контакты', to: '/#contact' },
]
</script>

<template>
  <header class="pt-5">
    <div class="shell flex items-center gap-8">
      <NuxtLink to="/" class="block">
        <img src="/logo.svg" width="149" height="41" alt="Реклама в городе" />
      </NuxtLink>
      <nav class="flex items-center gap-7 ml-6">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </NuxtLink>
      </nav>
      <a href="tel:+79600481629" class="ml-auto nav-link">+7 (960) 048-16-29</a>
    </div>
  </header>
</template>
