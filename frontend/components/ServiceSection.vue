<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  images: string[]
  imageCount: number
  columns?: 2 | 3
}>()

const { imageUrl } = useAdminApi()

</script>

<template>
  <section class="py-12 sm:py-16 lg:py-20 first:pt-16 sm:first:pt-20 lg:first:pt-28">
    <div class="shell">
      <h2 class="text-h2 mb-3 sm:mb-4 lg:mb-5">{{ title }}</h2>
      <p class="text-body-lg text-white/85 max-w-[1200px] mb-8 sm:mb-10 lg:mb-14 whitespace-pre-line">{{ description }}</p>
      <div
        class="grid gap-3 sm:gap-4"
        :class="columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'"
      >
        <template v-if="images.length === 0">
          <div
            v-for="i in imageCount"
            :key="i"
            class="placeholder-img"
            :class="columns === 2 ? 'aspect-[586/377]' : 'aspect-[387/236]'"
          />
        </template>
        <template v-else>
          <img
            v-for="(url, i) in images"
            :key="i"
            :src="imageUrl(url)"
            :alt="title"
            class="w-full object-cover rounded-xl sm:rounded-2xl"
            :class="columns === 2 ? 'aspect-[586/377]' : 'aspect-[387/236]'"
          />
        </template>
      </div>
    </div>
  </section>
</template>
