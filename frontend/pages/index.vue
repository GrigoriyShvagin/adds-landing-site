<script setup lang="ts">
import type { ServiceImagesBySlug } from '@ads/shared'

const { base } = useAdminApi()
const { data } = await useFetch<ServiceImagesBySlug>(`${base}/api/services`, {
  default: () => ({ signs: [], plaques: [], entry: [], complex: [], poryadok: [], hero: [] }),
})
const heroImages = computed(() => data.value?.hero ?? [])
</script>

<template>
  <div>
    <div class="relative isolate min-h-[100svh] flex flex-col">
      <HeroBackdrop :images="heroImages" />
      <AppHeader />
      <HeroSection />
    </div>
    <StatsSection />
    <ClientsSection />
    <ContactForm />
  </div>
</template>
