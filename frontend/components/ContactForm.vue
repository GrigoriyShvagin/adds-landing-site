<script setup lang="ts">
const api = useAdminApi()
const name = ref('')
const phone = ref('')
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const errorMsg = ref<string | null>(null)

async function submit() {
  if (!name.value.trim() || !phone.value.trim()) return
  status.value = 'sending'
  errorMsg.value = null
  try {
    await api.submitRequest({ name: name.value, phone: phone.value })
    status.value = 'sent'
    name.value = ''
    phone.value = ''
  } catch (e: any) {
    status.value = 'error'
    errorMsg.value = e?.data?.statusMessage || 'Не удалось отправить'
  }
}
</script>

<template>
  <section id="contact" class="bg-white py-10 sm:py-12 lg:py-14 text-[#3F3B3A]">
    <div class="shell grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-end">
      <form class="lg:col-span-7 order-2 lg:order-1" @submit.prevent="submit">
        <h3 class="text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-tight mb-5 lg:mb-6 text-[#3F3B3A]">
          Оставьте свои контакты, мы с Вами свяжемся!
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
          <input
            v-model="name"
            class="text-caption bg-transparent border-b border-[#3F3B3A]/40 text-[#3F3B3A] placeholder-[#3F3B3A]/70 py-2 outline-none focus:border-[#3F3B3A]"
            placeholder="Имя"
            required
          />
          <input
            v-model="phone"
            class="text-caption bg-transparent border-b border-[#3F3B3A]/40 text-[#3F3B3A] placeholder-[#3F3B3A]/70 py-2 outline-none focus:border-[#3F3B3A]"
            placeholder="Телефон"
            required
          />
        </div>
        <button
          class="btn text-caption font-medium bg-[#272036] text-white px-6 py-3 hover:bg-black"
          :disabled="status === 'sending'"
        >
          {{ status === 'sending' ? 'Отправка…' : 'Отправить' }}
        </button>
        <p v-if="status === 'sent'" class="text-sm text-green-700 mt-4">Заявка отправлена — свяжемся с Вами.</p>
        <p v-if="status === 'error'" class="text-sm text-red-700 mt-4">{{ errorMsg }}</p>
      </form>

      <div class="lg:col-span-5 order-1 lg:order-2 text-left lg:text-right">
        <a href="mailto:example@mail.ru" class="text-[18px] sm:text-[20px] font-medium block text-[#3F3B3A] mb-1 hover:underline">example@mail.ru</a>
        <a href="tel:+79600481629" class="text-[20px] sm:text-[22px] font-medium block text-[#3F3B3A]">+7 (960) 048-16-29</a>
        <div class="flex justify-start lg:justify-end gap-2 mt-3">
          <a href="https://t.me/" target="_blank" class="w-10 h-10 rounded-full bg-[#272036] flex items-center justify-center hover:opacity-90 overflow-hidden">
            <img :src="'/tg.png'" alt="Telegram" class="w-full h-full object-cover" />
          </a>
          <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-[#272036] flex items-center justify-center hover:opacity-90 overflow-hidden">
            <img :src="'/max.png'" alt="Max" class="w-full h-full object-cover" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
