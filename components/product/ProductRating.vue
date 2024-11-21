<template>
  <div class="product-rating">
    <span class="product-rating__stars">
      <template
        v-for="n in maxRating"
        :key="n">
        <img
          :src="showStar(n - 1)"
          class="product-rating__star">
      </template>
    </span>
    <slot name="reviews">
      <span>
        {{ product.reviews }} reviews
      </span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import FULL_STAR from '~/assets/images/star-100.svg'
import HALF_STAR from '~/assets/images/star-50.svg'
import ZERO_STAR from '~/assets/images/star-0.svg'

const props = defineProps({
  product: {
    type   : Object as PropType<Product>,
    default: () => ({} as Product),
  },
  maxRating: {
    type   : Number,
    default: 5,
  },
  rating: {
    type   : Number,
    default: 0,
  },
})

const ratingValues  = ref<number[]>([])
const currentRating = computed(() => props.product.rating ?? props.rating)

function generateRatings () {
  for (let i = 0; i < props.maxRating; i++) {
    let level = 0
    if (i < currentRating.value)
      level = (currentRating.value - i > 1) ? 100 : (currentRating.value - i) * 100

    ratingValues.value[i] = Math.round(level)
  }
}

function showStar (index: number) {
  const value = ratingValues.value.at(index) ?? 0

  if (value)
    return value === 100 ? FULL_STAR : HALF_STAR

  return ZERO_STAR
}

onMounted(() => {
  generateRatings()
})
</script>
