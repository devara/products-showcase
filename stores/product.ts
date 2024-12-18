import { acceptHMRUpdate } from 'pinia'
import { getProducts } from '~/repository/product'

export const useProductStore = defineStore('product-store', () => {
  const products = ref<Product[]>([])

  const productsTotal = ref<number>(19)

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
      q         : productSearchQuery.value,
      brand     : productFilters.brand ?? [],
      os        : productFilters.os ?? [],
      rating_gte: productMinRating.value,
    }
  })

  async function getProductList () {
    const responses = await getProducts(productQueryParams.value)

    products.value = responses ?? []
  }

  return {
    products,
    productsTotal,
    productsPagination,
    productSearchQuery,
    productMinRating,
    productOsVariants,
    productFilters,
    productQueryParams,
    getProductList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
