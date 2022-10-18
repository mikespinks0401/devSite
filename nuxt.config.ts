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
    jwtForgotSecret: process.env.JWT_FORGOT_TOKEN_SECRET,
    mainEmail: process.env.ADMIN_EMAIL,
    siteEmail: process.env.EMAIL_EMAIL,
    siteUsername: process.env.ADMIN_USERNAME,
    siteName: process.env.ENVIRONMENT === 'development' ? 'localhost:3000': process.env.SITE_NAME,
    testingServer: process.env.ENVIRONMENT === 'development' ? true : false,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

     turnstile: {
      secretKey: process.env.ENVIRONMENT === 'development' ? '1x0000000000000000000000000000000AA' : process.env.CLOUDFLARE_SECRET_KEY,
    },
  },
  turnstile: {
    siteKey: process.env.ENVIRONMENT === 'development' ? '1x00000000000000000000AA' : process.env.CLOUDFLARE_SECRET_KEY,
  },
})
