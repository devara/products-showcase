<template>
  <div
    class="product"
    @click="goToProductDetail">
    <img
      :src="product.images?.at(0)"
      alt=""
      class="product__image">
    <span class="product__title">{{ product.name }}</span>

    <ProductRating
      :product="product"
      :rating="productRating" />

    <div class="product__action">
      <button
        class="dev-bg-green-base dev-text-white"
        @click.stop="addToCart">
        Add cart
      </button>
      <button @click.stop="addToWishlist">
        Add wishlist
      </button>
    </div>

    <div
      v-if="productStock.value === 'sold-out'"
      class="product__sold-out">
      <span class="dev-m-auto dev-py-2 dev-px-3 dev-bg-red-light dev-text-white">{{ productStock.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  product: {
    type   : Object as PropType<Product>,
    default: () => ({} as Product),
  },
})

const {
  product: item,
  productStock,
  // productSale,
  productRating,
} = useProductAttribute()

function goToProductDetail () {
  navigateTo(`/product/${props.product.id}--${props.product.slug}`)
}

function addToCart () {}

function addToWishlist () {}

onMounted(() => {
  item.value = props.product
})
</script>
