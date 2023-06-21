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
    "frammer-nuxt",
    "nuxt-purgecss",
    "@vueuse/nuxt",
  ],
  plugins: [],

  purgecss: {
    enabled: false, // Always enable purgecss
    safelist: ["flex", "flex-column", "flex-grow-1"], // Add 'my-class' token to the safelist (e.g. .my-class)
  },
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
    // "primevue/resources/primevue.css",
    // "primevue/resources/themes/lara-light-blue/theme.css",
    // "primeflex/primeflex.css",
    "primeicons/primeicons.css",
    "~/assets/css/main.css",
  ],
  build: {
    // transpile: ["primevue"],
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
  nitro: {
    compressPublicAssets: true,
  },
  frammerNuxt: {
    iframeUrl: "http://localhost:3333",
  },
  experimental: {
    typedPages: true,
  },
  typescript: {
    strict: true,
  },
});
