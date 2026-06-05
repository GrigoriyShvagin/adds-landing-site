<script setup lang="ts">
import type { PortfolioCase } from '@ads/shared'

const api = useAdminApi()
const { data: cases } = await useAsyncData<PortfolioCase[]>('portfolio', () => api.portfolio() as Promise<PortfolioCase[]>)

// Локальные индексы текущего слайда для каждого кейса
const slides = ref<Record<number, number>>({})

function getSlide(c: PortfolioCase) {
  return slides.value[c.id] ?? 0
}
function move(c: PortfolioCase, dir: -1 | 1) {
  if (!c.images.length) return
  const cur = getSlide(c)
  const next = (cur + dir + c.images.length) % c.images.length
  slides.value = { ...slides.value, [c.id]: next }
}
</script>

<template>
  <div>
    <AppHeader />
    <section class="shell pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
      <h1 class="text-h2 mb-8 sm:mb-10 lg:mb-14">Готовые проекты</h1>

      <div v-if="!cases?.length" class="text-white/70 text-lg">Пока нет опубликованных кейсов.</div>

      <div v-else class="space-y-12 sm:space-y-10">
        <article
          v-for="c in cases"
          :key="c.id"
          class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          <div class="lg:col-span-8 relative">
            <div class="placeholder-img aspect-[692/468] overflow-hidden relative">
              <Transition name="slide-fade">
                <img
                  v-if="c.images.length"
                  :key="getSlide(c)"
                  :src="api.imageUrl(c.images[getSlide(c)].url)"
                  class="absolute inset-0 w-full h-full object-cover"
                  :alt="c.customer"
                />
              </Transition>
            </div>
            <template v-if="c.images.length > 1">
              <button
                class="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 text-ink-900 flex items-center justify-center"
                @click="move(c, -1)"
              >
                ←
              </button>
              <button
                class="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 text-ink-900 flex items-center justify-center"
                @click="move(c, 1)"
              >
                →
              </button>
            </template>
          </div>
          <div class="lg:col-span-4 space-y-4 sm:space-y-6">
            <h3 class="text-h2">{{ c.customer }}</h3>
            <div>
              <div class="text-body-lg font-semibold mb-2">Задача клиента:</div>
              <p class="text-caption text-white/85 whitespace-pre-line">{{ c.task }}</p>
            </div>
            <div>
              <div class="text-body-lg font-semibold mb-2">Решение:</div>
              <p class="text-caption text-white/85 whitespace-pre-line">{{ c.solution }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
    <ContactForm />
  </div>
</template>
