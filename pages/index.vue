<template>
  <div class="dev-home">
    <div class="dev-home__banner dev-flex dev-items-center dev-justify-center">
      <img
        src="/images/hero-banner.svg"
        class="">
    </div>
    <div class="product-filter-mobile-toggle">
      <button @click="mobileMenu = true">
        Show Filters
      </button>
    </div>
    <div class="products-list">
      <ProductFilter class="products-list__filter" />
      <div class="products-list__content">
        <div class="products-list__content__items">
          <ProductItem
            v-for="product in products"
            :key="product.id"
            :product="product" />
        </div>
        <NavigationPagination v-if="products.length > 0" />
      </div>
    </div>

    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="mobileMenu"
          class="product-filter-mobile-menu"
          @click="closeOnBackdrop">
          <div
            class="product-filter-mobile-menu__body">
            <ProductFilter @click.stop />
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const {
  products,
  productQueryParams,
} = storeToRefs(useProductStore())
const { getProductList } = useProductStore()

const mobileMenu = ref<boolean>(false)

function closeOnBackdrop () {
  const event = new CustomEvent('close')

  if (!event.defaultPrevented)
    mobileMenu.value = false
}

async function getList () {
  try {
    await getProductList()
  } catch (error) {
    console.error(error)
  }
}

watch(productQueryParams, async () => {
  await getList()

  if (import.meta.client)
    window.scrollTo({ top: 0, behavior: 'smooth' })
}, { deep: true })

onMounted(async () => {
  await getList()
})
</script>
