<script setup lang="ts">
const route = useRoute()
async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await navigateTo('/login')
}

const nav = [
  { to: '/', label: 'Дашборд' },
  { to: '/portfolio', label: 'Портфолио' },
  { to: '/services', label: 'Услуги' },
  { to: '/poryadok', label: 'Порядок работы' },
  { to: '/requests', label: 'Заявки' },
]
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="w-64 shrink-0 bg-ink-800 text-white p-6 flex flex-col gap-2">
      <div class="text-lg font-bold mb-6">Реклама в городе</div>
      <NuxtLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="rounded-lg px-3 py-2 hover:bg-ink-700"
        :class="{ 'bg-ink-700': route.path === item.to || route.path.startsWith(item.to + '/') }"
      >
        {{ item.label }}
      </NuxtLink>
      <button class="mt-auto rounded-lg px-3 py-2 text-left hover:bg-ink-700" @click="logout">
        Выйти
      </button>
    </aside>
    <main class="flex-1 p-8">
      <slot />
    </main>
  </div>
</template>
