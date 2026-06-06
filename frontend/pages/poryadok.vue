<script setup lang="ts">
import type { ServiceImagesBySlug } from '@ads/shared'

const steps = [
  { title: 'Заявка или звонок', text: 'Оставьте заявку на сайте или позвоните нам +7 (960) 048-16-29' },
  { title: 'Согласование дизайн-макета', text: 'Узнаем Ваши требования и разработаем дизайн-макет' },
  { title: 'Согласование паспорта', text: 'Согласовываем и подготавливаем паспорт' },
  { title: 'Изготовление конструкции', text: 'Создадим вывеску, которая придаст бизнесу узнаваемость' },
  { title: 'Монтажные работы', text: 'Доставим и смонтируем в любой точке' },
]

const { base, imageUrl } = useAdminApi()
const { data: images } = useLazyFetch<ServiceImagesBySlug>(`${base}/api/services`, {
  default: () => ({ signs: [], plaques: [], entry: [], complex: [], poryadok: [], hero: [] }),
})
const image = computed(() => images.value?.poryadok[0] ?? null)
</script>

<template>
  <div>
    <AppHeader />
    <section class="shell pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      <ol class="lg:col-span-6 order-2 lg:order-1 relative pl-6">
        <span class="absolute left-1 top-2 bottom-2 w-px bg-white/30" />
        <li v-for="(s, i) in steps" :key="i" class="relative mb-6 sm:mb-8 last:mb-0">
          <span class="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-white" />
          <h3 class="text-h3">{{ s.title }}</h3>
          <p class="text-caption text-white/85 mt-2">{{ s.text }}</p>
        </li>
      </ol>
      <div
        class="lg:col-span-6 order-1 lg:order-2 aspect-[718/482] rounded-card overflow-hidden"
        :class="{ 'placeholder-img': !image }"
      >
        <img v-if="image" :src="imageUrl(image)" class="w-full h-full object-cover" alt="" />
      </div>
    </section>
    <ContactForm />
  </div>
</template>
