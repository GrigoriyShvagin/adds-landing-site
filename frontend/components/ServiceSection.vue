<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  images: string[]
  imageCount: number
  columns?: 2 | 3
}>()

const { imageUrl } = useAdminApi()

const slots = computed(() => {
  const total = Math.max(props.imageCount, props.images.length)
  return Array.from({ length: total }, (_, i) => props.images[i] ?? null)
})
</script>

<template>
  <section class="py-20 first:pt-28">
    <div class="shell">
      <h2 class="text-h2 mb-5">{{ title }}</h2>
      <p class="text-body-lg text-white/85 max-w-[1200px] mb-14 whitespace-pre-line">{{ description }}</p>
      <div
        class="grid gap-4"
        :class="columns === 2 ? 'grid-cols-2' : 'grid-cols-3'"
      >
        <template v-for="(url, i) in slots" :key="i">
          <img
            v-if="url"
            :src="imageUrl(url)"
            :alt="title"
            class="w-full object-cover rounded-2xl"
            :class="columns === 2 ? 'aspect-[586/377]' : 'aspect-[387/236]'"
          />
          <div
            v-else
            class="placeholder-img"
            :class="columns === 2 ? 'aspect-[586/377]' : 'aspect-[387/236]'"
          />
        </template>
      </div>
    </div>
  </section>
</template>
