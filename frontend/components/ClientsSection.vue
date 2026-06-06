<script setup lang="ts">
const clients = [
  { name: '4 Лапы', src: '/clients/4-lapy.png' },
  { name: 'Askona', src: '/clients/askona.png' },
  { name: 'ТТС', src: '/clients/tts.png' },
  { name: 'Бахетле', src: '/clients/bahetle.png' },
  { name: 'Матур', src: '/clients/matur.png' },
  { name: 'Subaru', src: '/clients/subaru.png' },
  { name: 'Кан авто', src: '/clients/kan-avto.png' },
  { name: 'Связь·ON', src: '/clients/svyazon.png' },
]
</script>

<template>
  <section class="py-12 sm:py-16 lg:py-20">
    <div class="shell">
      <h2 class="text-h2 text-center mb-8 sm:mb-10 lg:mb-14">Наши клиенты</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-10 lg:gap-y-14 items-center">
        <div v-for="c in clients" :key="c.src" class="flex items-center justify-center">
          <img :src="c.src" :alt="c.name" class="h-14 sm:h-16 lg:h-20 w-auto max-w-full object-contain" />
        </div>
      </div>
    </div>
  </section>
</template>
