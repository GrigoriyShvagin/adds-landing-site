<script setup lang="ts">
const loading = ref(true)
onMounted(() => {
  nextTick(() => { loading.value = false })
})
</script>

<template>
  <div>
    <Transition name="loader">
      <div v-if="loading" class="loader-overlay">
        <img src="/logo-icon.png" alt="" class="loader-logo" />
        <div class="loader-spinner" />
      </div>
    </Transition>
    <NuxtPage />
    <ContactBubble />
  </div>
</template>

<style>
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #1F0A4B;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.loader-logo {
  width: 72px;
  height: auto;
  opacity: 0.95;
}

.loader-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader-enter-active,
.loader-leave-active {
  transition: opacity 0.4s ease;
}
.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>
