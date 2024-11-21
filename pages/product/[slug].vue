<template>
  <div class="product-detail">
    <div
      v-if="product"
      class="product-detail__display">
      <ProductImageSlider
        :product="product"
        class="product-detail__display__view" />

      <div class="product-detail__display__attributes">
        <div class="dev-flex">
          <h2>{{ product.name }}</h2>
          <span>{{ product.brand }}</span>
        </div>

        <ProductRating
          :product="product"
          :rating="productRating" />
      </div>
    </div>

    <div class="product-detail__description">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem porro vel minima nam assumenda accusantium, sed non magnam recusandae perspiciatis ad tempore eligendi mollitia animi! Deserunt minima unde illum dolorem?
    </div>

    <div
      v-if="!product && !isLoading"
      class="flex flex-col text-center">
      <h3 class="block text-3xl font-bold">
        Waduh, tujuanmu nggak ada!
      </h3>
      <p>Mungkin kamu salah jalan atau alamat. Ayo balik sebelum gelap!</p>
      <NuxtLink
        to="/"
        class="p-3 mt-8 text-white bg-green-500 rounded-lg">
        Kembali
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProduct } from '~/repository/product'

const {
  product,
  productRating,
  // productBaseImage,
  // productSale,
  // productStock,
} = useProductAttribute()

const isLoading = ref<boolean>(true)
const route     = useRoute()
const { slug }  = useRoute().params

const { data } = useFetch<Product>(`/api/products/${(slug as string ?? '').split('--').at(0)}`)
if (data.value)
  product.value = data.value

onMounted(async () => {
  if (data.value) {
    product.value   = data.value
    isLoading.value = false
    return
  }

  try {
    const params   = (route.params.slug as string ?? '').split('--')
    const producID = params.at(0)
    const slug     = params.at(1)

    if (producID) {
      const response = await getProduct(producID)
      if (!response)
        return

      if (response.slug !== slug)
        navigateTo('/')

      product.value = response
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

useSeoMeta({ title: () => data.value?.name ?? 'Kosong' })
</script>
