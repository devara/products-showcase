<template>
  <div class="product-filter">
    <div class="dev-flex dev-items-center dev-justify-between dev-px-2">
      <span class="dev-font-semibold">Filters</span>
      <button
        class="dev-px-3 dev-py-2 dev-rounded-full"
        @click="clearAllFilter">
        Clear all
      </button>
    </div>

    <a
      class="product-filter__toggle"
      @click="toggles.os = !toggles.os">
      <span class="dev-text-lg dev-font-medium">Operating System</span>
      <span v-if="toggles.os">&#9650;</span>
      <span v-else>&#9660;</span>
    </a>

    <div
      class="product-filter__items dev-px-2"
      :class="{
        'product-filter__items--active': toggles.os
      }">
      <span
        v-for="os in productOsVariants"
        :key="os.slug"
        class="product-filter__item">
        <input
          v-model="productFilters.os"
          :value="os.slug"
          type="checkbox">
        {{ os.name }}
      </span>
    </div>

    <a
      class="product-filter__toggle"
      @click="toggles.rating = !toggles.rating">
      <span class="dev-text-lg dev-font-medium">Rating</span>
      <span v-if="toggles.rating">&#9650;</span>
      <span v-else>&#9660;</span>
    </a>

    <div
      class="product-filter__items dev-px-2"
      :class="{
        'product-filter__items--active': toggles.rating
      }">
      <span
        v-for="rating in ratingOptions"
        :key="rating"
        class="product-filter__item">
        <input
          v-model="productMinRating"
          :value="rating"
          type="radio">
        <ProductRating :rating="parseFloat(rating)">
          <template #reviews>
            {{ rating }} & up
          </template>
        </ProductRating>
      </span>
    </div>

    <a
      class="product-filter__toggle"
      @click="toggles.brand = !toggles.brand">
      <span class="dev-text-lg dev-font-medium">Brand</span>
      <span v-if="toggles.brand">&#9650;</span>
      <span v-else>&#9660;</span>
    </a>

    <div
      class="product-filter__items dev-py-1 dev-px-2"
      :class="{
        'product-filter__items--active': toggles.brand
      }">
      Brand List
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProductOperatingSystems } from '~/repository/product'

const {
  productOsVariants,
  productMinRating,
  productFilters,
} = storeToRefs(useProductStore())

const toggles = reactive({
  os    : true,
  rating: true,
  brand : false,
})

const ratingOptions: string[] = [
  '4.5',
  '4.0',
  '3.5',
  '3.0',
]

function clearAllFilter () {
  productMinRating.value     = undefined
  productFilters.value.os    = []
  productFilters.value.brand = []
}

onMounted(async () => {
  try {
    const responses = await getProductOperatingSystems()
    if (responses)
      productOsVariants.value = responses
  } catch (error) {
    console.error(error)
  }
})
</script>
