// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { defineNuxtConfig } from 'nuxt/config';
export default defineNuxtConfig({
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  // nitro: {
  //   devProxy: {
  //     '/api' : process.env.BaseURL,
  //   }
  // },
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify', 'vue-toastification'],
  },
  // app: {
  //   head: {
  //     meta: [
  //       { "http-equiv": "Content-Security-Policy",
  //         content: "default-src 'self'; img-src data:;"
  //       }
  //     ]
  //   }
  // },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.BaseURL
    }
  },
  modules: [ '@pinia/nuxt','nuxt-proxy',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  //  proxy:{
  //   options: {
  //     target: process.env.BaseURL,
  //     changeOrigin: true,
  //   }
  //  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  routeRules: {
    '/': {ssr: true},
  },
  ssr: true,
  css: ["~/assets/css/main.css"],
})
