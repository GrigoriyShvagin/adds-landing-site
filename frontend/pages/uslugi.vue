<script setup lang="ts">
import type { ServiceImagesBySlug, ServiceSlug } from '@ads/shared'

// Тайтлы, описания и layout живут в коде — клиент их меняет крайне редко.
// Картинки приходят из админки по slug.
const services: { slug: ServiceSlug; title: string; description: string; imageCount: number; columns: 2 | 3 }[] = [
  {
    slug: 'signs',
    title: 'Вывески',
    description:
      'Создаем простые и яркие вывески, которые легко заметить и запомнить. Никаких лишних деталей — только самое важное и нужное.',
    imageCount: 6,
    columns: 3,
  },
  {
    slug: 'plaques',
    title: 'Таблички и стенды',
    description: 'Таблички и стенды любых форматов: создаём с вниманием к деталям',
    imageCount: 6,
    columns: 3,
  },
  {
    slug: 'entry',
    title: 'Оформление входных групп',
    description:
      'Входная группа — первое, что видят ваши гости и клиенты. Это визитная карточка дома или бизнеса, которая создаёт впечатление ещё до того, как человек переступит порог.\n\nМы создаём входные группы «под ключ»: от эскиза до монтажа. Каждая деталь продумана, каждый элемент выполнен с безупречным качеством.',
    imageCount: 4,
    columns: 2,
  },
  {
    slug: 'complex',
    title: 'Комплексное оформление',
    description:
      'Создаём пространства, в которых хочется жить и работать. Мы берём на себя все этапы: от идеи и проектирования до реализации и финального штриха.\n\nВам не нужно искать разных подрядчиков — мы обеспечим безупречный результат «под ключ».',
    imageCount: 4,
    columns: 2,
  },
]

const { base, imageUrl } = useAdminApi()
const { data: images, pending } = useLazyFetch<ServiceImagesBySlug>(`${base}/api/services`, {
  default: () => ({ signs: [], plaques: [], entry: [], complex: [], poryadok: [], hero: [] }),
})

// Загрузчик висит пока не пришли данные И не прогрузились сами картинки —
// чтобы пользователь не видел смену пустых блоков на фото.
const loading = ref(true)

function preload(urls: string[]) {
  return Promise.all(
    urls.map(
      (u) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = img.onerror = () => resolve()
          img.src = u
        }),
    ),
  )
}

const route = useRoute()

watch(
  pending,
  async (isPending) => {
    if (isPending) return
    const urls = services.flatMap((s) => (images.value?.[s.slug] ?? []).map((u) => imageUrl(u)))
    // Страховка: не держим экран дольше 3.5с, даже если картинка зависла.
    await Promise.race([preload(urls), new Promise((r) => setTimeout(r, 3500))])
    loading.value = false
    // Прокрутка к нужной услуге выполняется только после загрузки картинок,
    // иначе высота блоков ещё меняется и якорь промахивается.
    await nextTick()
    const slug = route.hash.slice(1)
    if (slug) document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <PageLoader :show="loading" />
    <AppHeader />
    <ServiceSection
      v-for="s in services"
      :key="s.slug"
      :id="s.slug"
      :title="s.title"
      :description="s.description"
      :image-count="s.imageCount"
      :columns="s.columns"
      :images="images?.[s.slug] ?? []"
    />
    <ContactForm />
  </div>
</template>
