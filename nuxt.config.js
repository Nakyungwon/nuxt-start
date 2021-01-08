// const BASE_DIR = process.env.BASE_DIR || ''

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  // router: {
  //   base: process.env.BASE_DIR === 'local',
  // },
  mode: 'universal',
  head: {
    title: 'nuxt-start',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Official Nuxt.js starter for CodeSandBox',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Iconfonts for Vuetify. You need to leave only which one you use
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css',
      },
    ],
    script: [
      {
        src: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js',
      },
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vee-validate',
    { src: '~/plugins/vue2-editor', ssr: false },
    { src: '~/plugins/TiptapVuetify', mode: 'client' },
  ],
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
    // '@nuxtjs/vuetify',
    // 'vue-wysiwyg/nuxt',
  ],
  // styleResources: { scss: ['~/assets/scss/main/main.scss'] },
  css: [
    '@/assets/scss/main/main.scss',
    // 'quill/dist/quill.core.css',
    // for snow theme
    // 'quill/dist/quill.snow.css',
    // for bubble theme
    // 'quill/dist/quill.bubble.css',
  ],

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
    transpile: ['vee-validate/dist/rules', 'vuetify/lib', 'tiptap-vuetify'],
  },

  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
    { path: '/account', handler: '~/api/account/index.js' },
    { path: '/board', handler: '~/api/board/index.js' },
  ],
}
