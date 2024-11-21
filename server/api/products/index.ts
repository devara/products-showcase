import { getPath } from '~/composables/use-runtime-path'

export default defineEventHandler(async (event) => {
  const query    = getQuery(event)
  const products = await $fetch(`${process.env.API_BASE_URL as string}${getPath('pathGetProducts')}`, { params: query })

  return products
})
