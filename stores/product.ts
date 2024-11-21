import { acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('product-store', () => {
  const products = ref<Product[]>([])

  const productSearchQuery = ref<string>()
  const productMinRating   = ref<number>()
  const productOsVariants  = ref<ProductOperatingSystem[]>([])
  const productsPagination = reactive({
    page   : 1,
    perPage: 10,
  })
  const productFilters     = reactive<ProductFilter>({
    os   : [],
    brand: [],
  })

  const productQueryParams = computed<Record<string, unknown>>(() => {
    return {
      _page     : productsPagination.page,
      _limit    : productsPagination.perPage,
      brand     : productFilters.brand ?? [],
      os        : productFilters.os ?? [],
      rating_gte: productMinRating.value,
    }
  })

  return {
    products,
    productsPagination,
    productSearchQuery,
    productMinRating,
    productOsVariants,
    productFilters,
    productQueryParams,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
