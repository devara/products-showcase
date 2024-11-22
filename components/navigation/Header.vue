<template>
  <nav class="dev-header">
    <h1
      class="dev-header__logo"
      @click="navigateTo('/')">
      Bakul HP
    </h1>
    <div class="dev-header__search">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
        @keyup.enter="onEnterSearch(searchQuery)">
    </div>
  </nav>
</template>

<script lang="ts" setup>
const { productSearchQuery } = storeToRefs(useProductStore())
const searchQuery            = ref<string>()

async function onEnterSearch (value?: string) {
  productSearchQuery.value = value
}
</script>
