const defaultStockValue: Stock = {
  value: 'sold-out',
  label: 'Sold Out',
}

export function useProductAttribute () {
  const product = ref<Product>()

  const productStock  = computed(() => {
    return product.value ? stockAttribute(product.value.stock) : defaultStockValue
  })
  const productSale   = computed<SaleValue>(() => {
    if (product.value)
      return saleAttribute(product.value)
  })
  const productRating = computed(() => {
    return ratingAttribute(product.value?.rating ?? 0)
  })

  const productBaseImage = computed(() => product.value?.images?.at(0) ?? '')

  function ratingAttribute (rating: ProductAttribute['rating']): number {
    return Math.round(rating * 2) / 2
  }

  /**
   * Sale attribute
   * new: is new product
   * best: rating > 4 && reviews > 25
   * hot: best && new
   */
  function saleAttribute (product: Product): SaleValue {
    const isBest = ratingAttribute(product.rating) >= 4 && product.reviews > 25

    if (isBest && product.isNew)
      return 'hot'

    if (isBest)
      return 'best'

    if (product.isNew)
      return 'new'
  }

  function stockAttribute (stock: ProductAttribute['stock']): Stock {
    if (stock < 1)
      return { value: 'sold-out', label: 'Sold Out' }

    if (stock < 5)
      return { value: 'running-low', label: 'Stock < 5' }

    return { value: 'in-stock', label: 'In Stock' }
  }

  return {
    product,
    productStock,
    productSale,
    productRating,
    productBaseImage,
    ratingAttribute,
    saleAttribute,
    stockAttribute,
  }
}
