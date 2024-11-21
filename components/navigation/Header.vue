<template>
  <nav class="dev-header">
    <h1
      class="dev-header__logo"
      @click="navigateTo('/')">
      Bakul HP
    </h1>
    <div class="dev-header__search">
      <input
        v-model="productSearchQuery"
        type="text"
        @keyup.enter="onEnterSearch">
    </div>
  </nav>
</template>

<script lang="ts" setup>
const { productSearchQuery } = storeToRefs(useProductStore())

async function onEnterSearch () {
  // console.log(productSearchQuery.value)
}
</script>
