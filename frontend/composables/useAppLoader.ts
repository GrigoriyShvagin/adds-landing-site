// Глобальное состояние загрузчика. Виден пока страница реально не отрисуется
// (данные + картинки), а не только пока резолвится fetch.
export function useAppLoader() {
  const loading = useState('app-loading', () => true)
  return {
    loading,
    done: () => { loading.value = false },
  }
}
