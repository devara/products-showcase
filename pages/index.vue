<template>
  <div class="dev-home">
    <div class="dev-home__banner dev-flex">
      <span class="dev-m-auto">
        Home Banner
      </span>
    </div>
    <span>
      {{ productSearchQuery }}
    </span>
    <div class="products-container">
      <ProductFilter class="dev-w-quarter" />
      <div class="dev-w-three-quarter product-list">
        <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
  products,
  productSearchQuery,
  productQueryParams,
} = storeToRefs(useProductStore())
const { getProductList } = useProductStore()

async function getList () {
  try {
    await getProductList()
  } catch (error) {
    console.error(error)
  }
}

watch(productQueryParams, async () => {
  await getList()
}, { deep: true })

onMounted(async () => {
  await getList()
})
</script>
