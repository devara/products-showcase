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
import { getProducts } from '~/repository/product'

const {
  products,
  productSearchQuery,
} = storeToRefs(useProductStore())

async function getProductList () {
  try {
    const responses = await getProducts()

    products.value = responses ?? []
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getProductList()
})
</script>
