<script setup lang="ts">
const visible = ref(true)

function checkBottom() {
  const scrollBottom = window.scrollY + window.innerHeight
  const pageHeight = document.documentElement.scrollHeight
  visible.value = pageHeight - scrollBottom > 20
}

onMounted(() => {
  window.addEventListener('scroll', checkBottom, { passive: true })
  checkBottom()
})
onUnmounted(() => window.removeEventListener('scroll', checkBottom))
</script>

<template>
  <Transition name="bubble">
    <a
      v-show="visible"
      href="#contact"
      aria-label="Связаться с нами"
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-white/30 bg-ink-700/70 backdrop-blur flex items-center justify-center group hover:bg-ink-700/90 transition"
    >
      <svg viewBox="0 0 120 120" class="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite]">
        <defs>
          <path id="contact-bubble-circle" d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
        </defs>
        <text class="text-[10px] uppercase tracking-widest fill-white">
          <textPath href="#contact-bubble-circle">Связаться с нами • Связаться с нами • </textPath>
        </text>
      </svg>
      <svg class="w-4 h-4 sm:w-6 sm:h-6 transition group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M6 13l6 6 6-6" />
      </svg>
    </a>
  </Transition>
</template>

<style scoped>
.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
