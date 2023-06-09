// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/sanity",
    "@nuxtjs/supabase",
    "@vite-pwa/nuxt",
    "@nuxt/devtools",
    "nuxt-scheduler",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  sanity: {
    projectId: "u678c0qn",
    dataset: "production",
    useCdn: true,
  },
  runtimeConfig: {
    sanity: {
      token: process.env.NUXT_SANITY_TOKEN,
    },
  },
  supabase: {},
  pwa: {},
  pages: true,
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    // "~/assets/css/main.css",
  ],
  build: {
    transpile: ["primevue"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "cookies",
  },
  experimental: {
    typedPages: true,
  },
});
