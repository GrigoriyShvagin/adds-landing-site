<script setup lang="ts">
// Crossfade-фон под шапкой и hero-секцией главной.
// Картинки приходят из админки (slug 'hero'); индекс меняется раз в 5 секунд.
// Если меньше двух картинок — таймер не запускаем.

const props = defineProps<{ images: string[] }>()
const { imageUrl } = useAdminApi()

const urls = computed(() => props.images.map((u) => imageUrl(u)))
const index = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function start() {
  if (timer) clearInterval(timer)
  if (urls.value.length > 1) {
    timer = setInterval(() => {
      index.value = (index.value + 1) % urls.value.length
    }, 5000)
  }
}

onMounted(start)
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

// На случай, если админ загрузит/удалит картинки без перезагрузки страницы.
watch(() => urls.value.length, () => {
  index.value = 0
  start()
})

const current = computed(() => urls.value[index.value] ?? null)
</script>

<template>
  <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <Transition name="hero-fade">
      <img
        v-if="current"
        :key="current"
        :src="current"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      />
    </Transition>
    <!-- На мобилке текст занимает всю ширину — нужен ровный полупрозрачный слой;
         на десктопе — горизонтальный градиент: темно слева, картинка раскрывается справа -->
    <div
      class="absolute inset-0 bg-ink-700/55 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink-700/95 lg:via-ink-700/65 lg:to-ink-700/15"
    />
    <!-- Нижняя плашка — нет шва при переходе к синей StatsSection -->
    <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ink-700/40" />
  </div>
</template>

<style scoped>
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1.4s ease;
}
.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}
.hero-fade-enter-to,
.hero-fade-leave-from {
  opacity: 1;
}
</style>
