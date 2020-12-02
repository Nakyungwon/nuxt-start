// const BASE_DIR = process.env.BASE_DIR || ''

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  // router: {
  //   base: process.env.BASE_DIR === 'local',
  // },
  head: {
    title: 'nuxt-start',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0',
      },

      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js',
      },
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/vee-validate'],
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // '@nuxtjs/bootstrap',
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
    'bootstrap-vue/nuxt',
  ],
  // styleResources: { scss: ['~/assets/scss/main/main.scss'] },
  css: ['@/assets/scss/main/main.scss'],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // baseURL: process.env.BASE_URL,
    // retry: { retries: 3 },
    proxy: true,
    // proxyHeaders: false,
    // credentials: false,
  },
  proxy: {
    // '/api/': 'http://www.naver.com', // proxy url
  },
  header: {
    common: {
      Accept: 'application/json, text/plain, */*',
      // Accept: 'application/json, text/plain, Access-Control-Allow-Origin',
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {},
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL,
  //   },
  // },
  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.BASE_URL,
  //   },
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
    { path: '/account', handler: '~/api/account/index.js' },
  ],
}
