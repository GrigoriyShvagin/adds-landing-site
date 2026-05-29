// Универсальный fetch к API админки. URL берётся из runtimeConfig.
export function useAdminApi() {
  const config = useRuntimeConfig()
  const base = config.public.adminApiBase

  return {
    base,
    portfolio: () => $fetch(`${base}/api/portfolio`),
    submitRequest: (body: { name: string; phone: string }) =>
      $fetch(`${base}/api/requests`, { method: 'POST', body }),
    imageUrl: (path: string) =>
      path.startsWith('http') ? path : `${base}${path}`,
  }
}
