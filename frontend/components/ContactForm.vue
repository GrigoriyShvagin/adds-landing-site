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
  <section id="contact" class="bg-white py-14 text-[#3F3B3A]">
    <div class="shell grid grid-cols-12 gap-8 items-end">
      <form class="col-span-7" @submit.prevent="submit">
        <h3 class="text-[24px] font-medium leading-none mb-6 text-[#3F3B3A]">Оставьте свои контакты, мы с Вами свяжемся!</h3>
        <div class="grid grid-cols-3 gap-6">
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
          <button
            class="btn text-caption font-medium bg-[#272036] text-white px-6 py-3 hover:bg-black"
            :disabled="status === 'sending'"
          >
            {{ status === 'sending' ? 'Отправка…' : 'Отправить' }}
          </button>
        </div>
        <p v-if="status === 'sent'" class="text-sm text-green-700 mt-4">Заявка отправлена — свяжемся с Вами.</p>
        <p v-if="status === 'error'" class="text-sm text-red-700 mt-4">{{ errorMsg }}</p>
      </form>

      <div class="col-span-5 text-right">
        <a href="tel:+79600481629" class="text-[22px] font-medium block text-[#3F3B3A]">+7 (960) 048-16-29</a>
        <div class="flex justify-end gap-2 mt-3">
          <a href="https://t.me/" target="_blank" class="w-10 h-10 rounded-full bg-[#272036] text-white flex items-center justify-center hover:opacity-90">TG</a>
          <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-[#272036] text-white flex items-center justify-center hover:opacity-90">M</a>
        </div>
      </div>
    </div>
  </section>
</template>
