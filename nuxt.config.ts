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
    "@dargmuesli/nuxt-cookie-control",
  ],
  plugins: [],

  cookieControl: {
    isModalForced: false,
    isCssEnabled: false,
    css: false,
    isCookieIdVisible: true,
    cookieNameIsConsentGiven: "ncc_c",
    cookieNameCookiesEnabledIds: "ncc_e",
    cookies: {
      necessary: [
        {
          name: {
            en: "Default cookies",
            hr: "Osnovni kolačići",
          },

          description: {
            en: "Used for cookie control.",
          },
          cookies: ["cookie_control_consent", "cookie_control_enabled_cookies"],
          targetCookieIds: ["soldo"],
        },
      ],
      optional: [
        {
          name: {
            en: "Google Analytics",
            hr: "Google Analitika",
          },
          description: {
            en: "Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.",
          },
          src: "https://www.googletagmanager.com/gtag/js?id=UA-138616567-1",
          async: true,
          cookies: ["_ga", "_gat_gtag_UA_138616567_1", "_gid"],
          targetCookieIds: ["_o", "_p", "_t"],
          accepted: () => {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "UA-138616567-1");
          },
        },
      ],
    },
    colors: {
      // barBackground: "#000",
      // barButtonBackground: "#fff",
      // barButtonColor: "#000",
      // barButtonHoverBackground: "#333",
      // barButtonHoverColor: "#fff",
      // barTextColor: "#fff",
      // checkboxActiveBackground: "#000",
      // checkboxActiveCircleBackground: "#fff",
      // checkboxDisabledBackground: "#ddd",
      // checkboxDisabledCircleBackground: "#fff",
      // checkboxInactiveBackground: "#000",
      // checkboxInactiveCircleBackground: "#fff",
      // controlButtonBackground: "#fff",
      // controlButtonHoverBackground: "#000",
      // controlButtonIconColor: "#000",
      // controlButtonIconHoverColor: "#fff",
      // focusRingColor: "#808080",
      // modalBackground: "#fff",
      // modalButtonBackground: "#000",
      // modalButtonColor: "#fff",
      // modalButtonHoverBackground: "#333",
      // modalButtonHoverColor: "#fff",
      // modalOverlay: "#000",
      // modalOverlayOpacity: 0.8,
      // modalTextColor: "#000",
      // modalUnsavedColor: "#fff",
    },
  },

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
