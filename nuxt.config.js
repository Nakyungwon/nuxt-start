// const BASE_DIR = process.env.BASE_DIR || ''
import bodyParser from 'body-parser'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  router: {
    // middleware: ['shop/user/auth'],
    // base: process.env.BASE_DIR === 'local',
    // extendRoutes(routes, resolve) {
    // routes.length = 0
    // routes.push({
    //   path: '/local',
    //   component: resolve(__dirname, 'pages/local.vue'),
    //   name: 'local',
    // })
    // routes.push({
    //   path: '/shop',
    //   component: resolve(__dirname, 'pages/shop/index.vue'),
    //   name: 'shop',
    // })
    // routes.push({
    //   path: '/design',
    //   component: resolve(__dirname, 'pages/design.vue'),
    //   name: 'design',
    // })
    // routes.push({
    //   path: '/index',
    //   component: resolve(__dirname, 'pages/index.vue'),
    //   name: 'index',
    // })
    // },
  },
  // mode: 'universal',
  // auth: {
  //   localStorage: false,
  //   cookie: {
  //     options: {
  //       expires: 7,
  //     },
  //   },
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: '/shop/user/login',
  //           method: 'post',
  //           propertyName: false,
  //         },
  //         logout: false,
  //         user: { url: '/shop/user/check', method: 'get', propertyName: false },
  //       },
  //     },
  //   },
  //   plugins: [
  //     '~/plugins/axios.js',
  //     { src: '~/plugins/auth.js', mode: 'client' },
  //   ],
  // },
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
      {
        src: 'https://kit.fontawesome.com/a076d05399.js',
      },
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // '~/plugins/vee-validate',
    // { src: '~/plugins/vue2-editor', ssr: false },
    // { src: '~/plugins/TiptapVuetify', mode: 'client' },
    { src: '~/plugins/shop/auth/index', ssr: false },
    // { src: '~/plugins/shop/axios' },
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
    '@nuxtjs/axios',
    // '@nuxtjs/vuetify',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/device',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    // 'bootstrap-vue/nuxt',
  ],
  // styleResources: { scss: ['~/assets/scss/main/main.scss'] },
  // css: ['@/assets/scss/main/main.scss'],
  styleResources: {
    scss: ['@/assets/scss/shop/common.scss'],
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  proxy: {
    // '/api/': 'http://www.naver.com', // proxy url
  },
  header: {
    common: {
      Accept:
        'application/json, application/x-www-form-urlencoded, text/plain, */*',
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
  axios: {
    baseURL: process.env.BASE_URL,
    proxy: true,
    proxyHeaders: true,
    headers: {
      common: {},
    },
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           url: '/shop/user/login',
  //           method: 'post',
  //           propertyName: 'access',
  //         },
  //         user: { url: '/check/', method: 'get', propertyName: false },
  //       },
  //     },
  //   },
  // },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // vendor: ['~/plugins/shop/auth'],
    // transpile: ['vee-validate/dist/rules', 'vuetify/lib', 'tiptap-vuetify'],
  },

  serverMiddleware: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    { path: '/', handler: '~/api/index.js' },
    { path: '/shop', handler: '~/api/shop/index.js' },
  ],
}
