<script setup lang="ts">
// Полноэкранный загрузчик для страниц, которые тянут данные/картинки на клиенте.
// Визуально идентичен boot-loader'у (server/plugins/boot-loader.ts), чтобы переход
// от первичного загрузчика к этому был бесшовным.
defineProps<{ show: boolean }>()
</script>

<template>
  <Transition name="page-loader">
    <div v-if="show" class="page-loader">
      <img :src="'/logo-icon.png'" alt="" class="page-loader__logo" />
      <div class="page-loader__spinner" />
    </div>
  </Transition>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: #1F0A4B;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
}
.page-loader__logo {
  width: 64px;
  height: auto;
  animation: page-loader-pulse 1.4s ease-in-out infinite;
}
.page-loader__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.12);
  border-top-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: page-loader-spin 0.8s linear infinite;
}
@keyframes page-loader-spin {
  to { transform: rotate(360deg); }
}
@keyframes page-loader-pulse {
  0%, 100% { opacity: 0.55; }
  50%      { opacity: 1; }
}
.page-loader-leave-active {
  transition: opacity 0.4s ease;
}
.page-loader-leave-to {
  opacity: 0;
}
</style>
