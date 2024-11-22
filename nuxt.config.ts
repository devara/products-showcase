// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools         : { enabled: false },
  modules          : ['@pinia/nuxt'],
  css              : ['@/assets/scss/main.scss'],
  vite             : { css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } } },
  features         : { inlineStyles: false },
  runtimeConfig    : {
    public: {
      apiBaseUrl     : '/api',
      pathGetProducts: '',
      pathGetProduct : '',
      pathGetOs      : '',
    },
  },
  app: {
    head: {
      title        : 'Dodolane yo jelas HP',
      titleTemplate: '%s - Bakul HP',
    },
  },
})
