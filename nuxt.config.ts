// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    head: {
        link: [
            {rel: 'icon', type: 'image/x-icon', href:"/favicon.ico"}
        ]
    },
    modules: [
        "@nuxtjs/tailwindcss"
    ]
})
