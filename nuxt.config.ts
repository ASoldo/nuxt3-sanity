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
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
  ],
  routeRules: {
    // Homepage pre-rendered at build time
    // "/": { prerender: true },
    // Product page generated on-demand, revalidates in background
    // "/products/**": { swr: true },
    // Blog post generated on-demand once until next deploy
    // "/blog/**": { isr: true },
    // Admin dashboard renders only on client-side
    // "/admin/**": { ssr: false },
    // Add cors headers on API routes
    "/api/**": { cors: true },
    // Redirects legacy urls
    // "/old-page": { redirect: "/new-page" },
    "/game": { index: false },
    "/profile": { index: false },
    "/prizes": { index: false },
  },
  sitemap: {
    enabled: true,
  },
  robots: {
    enabled: true,
    allow: ["/"],
    disallow: ["/*"],
    blockNonSeoBots: true,
  },
  plugins: [],

  purgecss: {
    enabled: false, // Always enable purgecss
    safelist: [], // Add 'my-class' token to the safelist (e.g. .my-class)
  },
  sanity: {
    projectId: "u678c0qn",
    dataset: "production",
    useCdn: true,
  },
  // runtimeConfig: {
  //   sanity: {
  //     token: process.env.NUXT_SANITY_TOKEN,
  //   },
  // },

  supabase: {},
  pwa: {
    strategies: "injectManifest",
    filename: "sw.ts",
    srcDir: "public",
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: "/",
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      globIgnores: ["**/node_modules/**/*", "sw.ts", "workbox-*.js"],
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
    manifest: {
      name: "Kaufland Igra",
      short_name: "Kaudland Igra",
      theme_color: "#ffffff",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
  },
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
