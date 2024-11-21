<template>
  <div class="breadcrumbs">
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <span>&#8250;</span>
    <NuxtLink>
      {{ current }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  current: {
    type   : String,
    default: '',
  },
})
</script>
