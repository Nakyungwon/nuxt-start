import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7781ce92 = () => interopDefault(import('../pages/main.vue' /* webpackChunkName: "pages/main" */))
const _3d7e3df9 = () => interopDefault(import('../pages/account/login.vue' /* webpackChunkName: "pages/account/login" */))
const _205884bd = () => interopDefault(import('../pages/board/regist.vue' /* webpackChunkName: "pages/board/regist" */))
const _284033c4 = () => interopDefault(import('../pages/callback/naver.vue' /* webpackChunkName: "pages/callback/naver" */))
const _52618152 = () => interopDefault(import('../pages/grammar/convention.vue' /* webpackChunkName: "pages/grammar/convention" */))
const _5950acd3 = () => interopDefault(import('../pages/grammar/for.vue' /* webpackChunkName: "pages/grammar/for" */))
const _07fe27a1 = () => interopDefault(import('../pages/grammar/inputText.vue' /* webpackChunkName: "pages/grammar/inputText" */))
const _7f972acc = () => interopDefault(import('../pages/grammar/listener.vue' /* webpackChunkName: "pages/grammar/listener" */))
const _b5ce4b78 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/main",
    component: _7781ce92,
    name: "main"
  }, {
    path: "/account/login",
    component: _3d7e3df9,
    name: "account-login"
  }, {
    path: "/board/regist",
    component: _205884bd,
    name: "board-regist"
  }, {
    path: "/callback/naver",
    component: _284033c4,
    name: "callback-naver"
  }, {
    path: "/grammar/convention",
    component: _52618152,
    name: "grammar-convention"
  }, {
    path: "/grammar/for",
    component: _5950acd3,
    name: "grammar-for"
  }, {
    path: "/grammar/inputText",
    component: _07fe27a1,
    name: "grammar-inputText"
  }, {
    path: "/grammar/listener",
    component: _7f972acc,
    name: "grammar-listener"
  }, {
    path: "/",
    component: _b5ce4b78,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
