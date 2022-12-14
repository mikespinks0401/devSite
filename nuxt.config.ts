// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  head: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    htmlAttrs: { lang: 'en' },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-turnstile',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          'acceptHMRUpdate', // import hot model updates
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    mainEmail: process.env.ADMIN_EMAIL,
    siteEmail: process.env.EMAIL_EMAIL,
    testingServer: process.env.NODE_ENV === 'development' ? true : false,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

     turnstile: {
      secretKey: process.env.NODE_ENV === 'development' ? '1x0000000000000000000000000000000AA' : process.env.CLOUDFLARE_SECRET_KEY,
    },
  },
  turnstile: {
    siteKey: process.env.NODE_ENV === 'development' ? '1x00000000000000000000AA' : process.env.CLOUDFLARE_SECRET_KEY,
  },
})
