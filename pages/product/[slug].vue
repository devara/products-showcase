<template>
  <div>
    <div v-if="status === 'success' && data">
      <span>{{ data.name }}</span>
    </div>

    <div
      v-if="status === 'error'"
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
const { slug } = useRoute().params

const id = (slug as string ?? '').split('--').at(0)

const { data, status } = useFetch<Product>(`/api${getPath('pathGetProduct', { id })}`)

useSeoMeta({ title: () => data.value?.name ?? 'Kosong' })
</script>
