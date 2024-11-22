<template>
  <div class="product-detail">
    <div
      v-if="product"
      class="product-detail__display">
      <ProductImageSlider
        :product="product"
        class="product-detail__display__view" />

      <div class="product-detail__display__attributes">
        <NavigationBreadcrumb :current="product.name" />

        <div class="product-detail__display__attributes--item title">
          <h2>{{ product.name }}</h2>
          <span class="dev-mt-3">
            {{ product.brand }}
          </span>
        </div>

        <div class="product-detail__display__attributes--item dev-flex dev-items-center dev-justify-between">
          <div class="dev-flex dev-flex-column">
            <span class="discount-price">
              ${{ randomPrice }}
            </span>
            <span class="base-price">
              ${{ basePrice }}
            </span>
          </div>
          <div class="dev-flex dev-flex-column dev-ml-6">
            <ProductRating
              :product="product"
              :rating="productRating" />
            <p class="dev-mt-2 dev-text-sm lg:dev-text-base">
              <span class="dev-text-green-base">93%</span> of buyers have recommended this.
            </p>
          </div>
        </div>

        <div class="product-detail__display__attributes--item">
          <span class="dev-text-gray-base">Choose color</span>
          <span class="product-colors dev-mt-3">
            <button
              v-for="(color, i) in colorVariants"
              :key="i"
              class="product-colors__selector"
              :class="[`dev-bg-${color}-light`]"
              @click="colorSelected = color">
              <span
                v-if="color === colorSelected"
                class="dev-text-white">
                &#10004;
              </span>
            </button>
          </span>
        </div>

        <div class="product-detail__display__attributes--item actions">
          <div class="actions__quantity">
            <button @click="toggleQuantity('reduce')">
              -
            </button>
            <input
              v-model="quantity"
              type="number"
              :min="1"
              :max="product.stock">
            <button @click="toggleQuantity('add')">
              +
            </button>
          </div>
          <button class="actions__cart">
            Add to cart
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="product"
      class="product-detail__description">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem porro vel minima nam assumenda accusantium, sed non magnam recusandae perspiciatis ad tempore eligendi mollitia animi! Deserunt minima unde illum dolorem?
    </div>

    <div
      v-if="!product && !isLoading"
      class="product-detail__not-found">
      <img
        src="/images/404-not-found.svg">
      <h3>
        Waduh, tujuanmu nggak ada!
      </h3>
      <p>Mungkin kamu salah jalan atau alamat. Ayo balik sebelum gelap!</p>
      <NuxtLink to="/">
        Kembali
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProducts, getProduct } from '~/repository/product'

const {
  product,
  productRating,
  productStock,
  productBaseImage,
} = useProductAttribute()
const {
  getMetaTitle,
  getMetaDescription,
  getMetaUrl,
  getMetaImageUrl,
  getMetaImageType,
} = useAppMeta()

const quantity        = ref<number>(1)
const similarProducts = ref<Product[]>([])

const isLoading = ref<boolean>(true)
const route     = useRoute()
const { slug }  = useRoute().params

const { data } = useFetch<Product>(`/api/products/${(slug as string ?? '').split('--').at(0)}`)

const randomPrice = computed<number>(() => {
  const decimal1 = Math.floor(Math.random() * (100 - 50 + 1) + 50)
  const decimal2 = Math.floor(Math.random() * (99 - 1 + 1) + 1) / 100

  return decimal1 + decimal2
})

const basePrice = computed<number>(() => {
  return randomPrice.value + 2
})

const colorSelected           = ref<string>('green')
const colorVariants: string[] = [
  'green',
  'blue',
  'red',
]

function toggleQuantity (type: 'add' | 'reduce') {
  if (productStock.value.value === 'sold-out')
    return

  if (type === 'add' && quantity.value < (product.value?.stock ?? 0))
    quantity.value++

  if (type === 'reduce' && quantity.value !== 0)
    quantity.value--
}

async function getProductInBrands () {
  if (!product.value)
    return

  try {
    const responses = await getProducts({ brand: product.value.brand })
    if (responses)
      similarProducts.value = responses
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  if (data.value) {
    product.value   = data.value
    isLoading.value = false
    await getProductInBrands()
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
      await getProductInBrands()
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
})

useSeoMeta({
  title        : () => getMetaTitle(data.value?.name ?? product.value?.name),
  ogTitle      : () => getMetaTitle(data.value?.name ?? product.value?.name),
  description  : () => getMetaDescription(data.value?.name),
  ogDescription: () => getMetaDescription(data.value?.name),
  ogImage      : () => {
    return {
      url      : getMetaImageUrl(data.value?.images?.at(0) ?? productBaseImage.value),
      secureUrl: getMetaImageUrl(data.value?.images?.at(0) ?? productBaseImage.value),
      alt      : data.value?.name ?? product.value?.name,
      type     : getMetaImageType(data.value?.images?.at(0) ?? productBaseImage.value),
    }
  },
  ogUrl             : () => getMetaUrl('product', (route.params.slug ?? '') as string),
  twitterTitle      : () => getMetaTitle(data.value?.name ?? product.value?.name),
  twitterDescription: () => getMetaDescription(data.value?.name),
  twitterImage      : () => getMetaImageUrl(data.value?.images?.at(0) ?? productBaseImage.value),
  twitterCard       : 'summary',
})
</script>
