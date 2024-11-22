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
      apiBaseUrl      : '/api',
      pathGetProducts : '',
      pathGetProduct  : '',
      pathGetOs       : '',
      metaBaseTitle   : 'Dodolane yo jelas HP',
      metaWebTitle    : 'Bakul HP',
      metaDefaultImage: 'https://res.cloudinary.com/devaraeko/image/upload/v1732013475/images/products/apple-iphone-pro-11.jpg',
      metaDefaultDesc : 'Cari hp murah tapi gak murahan? Di Bakul HP tempatnya. Aman nyaman dan terpercaya',
    },
  },
  app: {
    head: {
      title        : 'Dodolane yo jelas HP',
      titleTemplate: '%s - Bakul HP',
    },
  },
})
