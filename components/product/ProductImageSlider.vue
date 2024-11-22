<template>
  <div class="">
    <div class="product-img-slider">
      <Transition
        :name="sliderTransition"
        mode="out-in">
        <img
          v-if="activeImage && !sliderSwiping"
          :src="activeImage">
      </Transition>

      <button
        class="product-img-slider__prev"
        @click="toggleImageSlider('prev')">
        &#8249;
      </button>
      <button
        class="product-img-slider__next"
        @click="toggleImageSlider('next')">
        &#8250;
      </button>
    </div>
    <div class="product-img-thumbnails">
      <div
        v-for="(item, i) in productImages"
        :key="i"
        class="product-img-thumbnails__item"
        :class="{
          'product-img-thumbnails__item--active': activeSlider === i
        }">
        <img
          :src="item"
          @click="setActiveSlider(i)">
      </div>
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

const activeSlider = ref<number>(0)
const activeImage  = computed<string>(() => productImages.value[activeSlider.value])

const sliderTransition = ref<'slide-left' | 'slide-right'>('slide-right')
const sliderSwiping    = ref<boolean>(false)

const productImages = computed<string[]>(() => {
  const items = props.product.images?.at(0)
  if (items) {
    return [
      items,
      items,
      items,
    ]
  }
  return []
})

function toggleSliderSwipe (value: boolean) {
  if (value)
    sliderSwiping.value = true
  else {
    setTimeout(() => {
      sliderSwiping.value = false
    }, 500)
  }
}

function toggleImageSlider (value: 'prev' | 'next') {
  sliderTransition.value = value === 'prev' ? 'slide-left' : 'slide-right'
  toggleSliderSwipe(true)
  if (value === 'prev')
    activeSlider.value = activeSlider.value === 0 ? (productImages.value.length - 1) : (activeSlider.value - 1)
  else
    activeSlider.value = activeSlider.value === (productImages.value.length - 1) ? 0 : (activeSlider.value + 1)

  toggleSliderSwipe(false)
}

function setActiveSlider (value: number) {
  toggleSliderSwipe(true)
  activeSlider.value = value
  toggleSliderSwipe(false)
}
</script>
