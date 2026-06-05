<script setup lang="ts">
const nav = [
  { label: 'Услуги', to: '/uslugi' },
  { label: 'Портфолио', to: '/portfolio' },
  { label: 'Порядок работы', to: '/poryadok' },
  { label: 'Рассчитать стоимость', to: '/#contact' },
  { label: 'Контакты', to: '/#contact' },
]

const isOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { isOpen.value = false })
</script>

<template>
  <header class="pt-5 relative z-40">
    <div class="shell flex items-center gap-4 lg:gap-8">
      <NuxtLink to="/" class="block shrink-0" @click="isOpen = false">
        <img
          :src="'/logo.svg'"
          width="149"
          height="41"
          alt="Реклама в городе"
          class="h-8 w-auto sm:h-9 lg:h-[41px]"
        />
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-7 ml-6">
        <NuxtLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-link">
          {{ item.label }}
        </NuxtLink>
      </nav>
      <a href="tel:+79600481629" class="hidden lg:block ml-auto nav-link whitespace-nowrap">
        +7 (960) 048-16-29
      </a>

      <button
        type="button"
        class="lg:hidden ml-auto w-10 h-10 flex items-center justify-center text-white"
        :aria-expanded="isOpen"
        aria-label="Меню"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>

    <Transition name="menu">
      <div v-if="isOpen" class="lg:hidden overflow-hidden bg-ink-700/95 backdrop-blur-sm">
        <nav class="shell flex flex-col pt-4 pb-6">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="text-[18px] font-medium text-white/95 py-3 border-b border-white/10"
            @click="isOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
          <a
            href="tel:+79600481629"
            class="text-[20px] font-semibold text-white mt-5 inline-block"
          >
            +7 (960) 048-16-29
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: max-height 280ms ease, opacity 220ms ease;
}
.menu-enter-from,
.menu-leave-to {
  max-height: 0;
  opacity: 0;
}
.menu-enter-to,
.menu-leave-from {
  max-height: 480px;
  opacity: 1;
}
</style>
