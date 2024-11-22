<template>
  <div class="pagination">
    <span class="dev-inline-flex dev-items-center">
      <label>Per page</label>
      <select
        v-model="perPage"
        class="dev-items-center dev-px-3 dev-py-2 dev-ml-3 dev-border dev-rounded-lg">
        <option
          v-for="val in [5, 10, 15]"
          :key="val"
          :value="val">
          {{ val }}
        </option>
      </select>
    </span>
    <button
      v-if="canPrevPage"
      class="pagination__prev"
      @click="togglePage('prev')">
      Prev
    </button>
    <button
      v-if="canNextPage"
      class="pagination__next"
      @click="togglePage('next')">
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
const {
  productsTotal,
  productsPagination,
} = storeToRefs(useProductStore())

const perPage = ref(productsPagination.value.perPage)

const canPrevPage = computed(() => productsPagination.value.page > 1)
const canNextPage = computed(() => {
  return (productsPagination.value.page * productsPagination.value.perPage) < productsTotal.value
})

function togglePage (value: 'prev' | 'next') {
  if (value === 'next')
    productsPagination.value.page++
  else
    productsPagination.value.page--
}

watch(perPage, (value) => {
  productsPagination.value.page    = 1
  productsPagination.value.perPage = value
})
</script>
