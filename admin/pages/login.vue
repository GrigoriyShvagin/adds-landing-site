<script setup lang="ts">
definePageMeta({ layout: false })

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function submit() {
  error.value = null
  loading.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await navigateTo('/')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Ошибка входа'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-ink-800">
    <form class="w-full max-w-sm card space-y-4" @submit.prevent="submit">
      <h1 class="text-xl font-bold">Вход в админку</h1>
      <label class="block">
        <span class="text-sm">Email</span>
        <input v-model="email" type="email" class="input mt-1" autocomplete="username" required />
      </label>
      <label class="block">
        <span class="text-sm">Пароль</span>
        <input v-model="password" type="password" class="input mt-1" autocomplete="current-password" required />
      </label>
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <button class="btn-primary w-full" :disabled="loading">
        {{ loading ? 'Вход…' : 'Войти' }}
      </button>
    </form>
  </div>
</template>
