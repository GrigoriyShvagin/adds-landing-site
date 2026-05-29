<script setup lang="ts">
// Захардкожено: цифры меняются раз в год, в БД хранить смысла нет.
// number / suffix разнесены явно — в Figma они на разных строках одинаковым весом.
const stats = [
  {
    number: '21',
    suffix: 'год опыта',
    text: 'Занимаемся изготовлением рекламной продукции с 2005 года',
  },
  {
    number: '10 000+',
    suffix: 'проектов',
    text: 'Накопили огромный опыт и реализовали свыше 10000 проектов в разных отраслях бизнеса',
  },
  {
    number: '100+',
    suffix: 'постоянных клиентов',
    text: 'Каждый день мы помогаем реализовать Ваши идеи более 100 постоянным клиентам',
  },
]
</script>

<template>
  <section class="bg-accent py-14">
    <div class="shell grid grid-cols-3 gap-8">
      <div v-for="s in stats" :key="s.number" class="text-center">
        <div class="text-[44px] leading-[1.05] font-extrabold">{{ s.number }}</div>
        <div class="text-[28px] leading-tight font-bold mt-1">{{ s.suffix }}</div>
        <p class="mt-5 text-sm text-white/85 max-w-[280px] mx-auto leading-snug">{{ s.text }}</p>
      </div>
    </div>
  </section>
</template>
