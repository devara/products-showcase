import { getPath } from '~/composables/use-runtime-path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (id) {
    try {
      const product = await $fetch(`${process.env.API_BASE_URL as string}${getPath('pathGetProduct', { id })}`)

      return product
    } catch {
      throw createError({
        statusCode   : 404,
        statusMessage: 'Product not found',
      })
    }
  }

  return {}
})
