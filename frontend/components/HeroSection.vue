<script setup lang="ts">
const services = [
  { label: 'Вывески', slug: 'signs' },
  { label: 'Таблички и стенды', slug: 'plaques' },
  { label: 'Оформление входных групп', slug: 'entry' },
  { label: 'Комплексное оформление', slug: 'complex' },
]
</script>

<template>
  <section class="flex-1 w-full">
    <div class="shell pt-16 sm:pt-24 lg:pt-36 pb-8 sm:pb-10 lg:pb-12">
      <h1 class="text-display tracking-tight">Изготавливаем</h1>
      <ul class="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-lead text-white/80">
        <li v-for="s in services" :key="s.slug">
          <NuxtLink
            :to="`/uslugi#${s.slug}`"
            class="inline-block underline underline-offset-4 decoration-white/40 hover:text-white hover:decoration-white transition"
          >
            {{ s.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
