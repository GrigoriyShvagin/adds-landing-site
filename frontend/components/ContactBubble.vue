<script setup lang="ts">
// Плавающий кружок «Связаться с нами» — fixed на всех страницах, скроллит к #contact.
</script>

<template>
  <a
    href="#contact"
    aria-label="Связаться с нами"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border border-white/30 bg-ink-700/70 backdrop-blur flex items-center justify-center group hover:bg-ink-700/90 transition"
  >
    <svg viewBox="0 0 120 120" class="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite]">
      <defs>
        <path id="contact-bubble-circle" d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" />
      </defs>
      <text class="text-[10px] uppercase tracking-widest fill-white">
        <textPath href="#contact-bubble-circle">Связаться с нами • Связаться с нами • </textPath>
      </text>
    </svg>
    <svg class="w-5 h-5 sm:w-6 sm:h-6 transition group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  </a>
</template>
