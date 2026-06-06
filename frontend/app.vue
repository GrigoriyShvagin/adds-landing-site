<script setup lang="ts">
const { loading, done } = useAppLoader()

onMounted(() => {
  // Прячем загрузчик когда вся страница (включая картинки) реально загружена.
  // window 'load' = все ресурсы готовы; cap-таймаут чтобы длинные галереи не держали экран.
  const finish = () => done()

  if (document.readyState === 'complete') {
    requestAnimationFrame(finish)
  } else {
    window.addEventListener('load', finish, { once: true })
  }

  // Страховка: не держим загрузчик дольше 3.5с даже если какая-то картинка зависла.
  setTimeout(finish, 3500)
})
</script>

<template>
  <div>
    <Transition name="app-loader">
      <div v-if="loading" class="app-loader">
        <img :src="'/logo-icon.png'" alt="" class="app-loader__logo" />
        <div class="app-loader__spinner" />
      </div>
    </Transition>
    <NuxtPage />
    <ContactBubble />
  </div>
</template>

<style scoped>
.app-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #1F0A4B;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
}
.app-loader__logo {
  width: 64px;
  height: auto;
  animation: app-loader-pulse 1.4s ease-in-out infinite;
}
.app-loader__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: app-loader-spin 0.8s linear infinite;
}
@keyframes app-loader-spin {
  to { transform: rotate(360deg); }
}
@keyframes app-loader-pulse {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 1; }
}

/* Плавно убираем загрузчик, открывая готовую страницу */
.app-loader-leave-active {
  transition: opacity 0.4s ease;
}
.app-loader-leave-to {
  opacity: 0;
}
</style>
