import { getPath } from '~/composables/use-runtime-path'

export default defineEventHandler(async () => {
  const os = await $fetch(`${process.env.API_BASE_URL as string}${getPath('pathGetOs')}`)

  return os
})
