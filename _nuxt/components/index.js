export { default as Logo } from '../../components/Logo.vue'
export { default as NavigationTest } from '../../components/NavigationTest.vue'
export { default as Table } from '../../components/Table.vue'
export { default as LoginModalComp } from '../../components/account/LoginModalComp.vue'
export { default as Footer } from '../../components/footer/footer.vue'
export { default as InputComp } from '../../components/input/inputComp.vue'
export { default as MainNavComp } from '../../components/nav/MainNavComp.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazyNavigationTest = import('../../components/NavigationTest.vue' /* webpackChunkName: "components/NavigationTest" */).then(c => c.default || c)
export const LazyTable = import('../../components/Table.vue' /* webpackChunkName: "components/Table" */).then(c => c.default || c)
export const LazyLoginModalComp = import('../../components/account/LoginModalComp.vue' /* webpackChunkName: "components/account/LoginModalComp" */).then(c => c.default || c)
export const LazyFooter = import('../../components/footer/footer.vue' /* webpackChunkName: "components/footer/footer" */).then(c => c.default || c)
export const LazyInputComp = import('../../components/input/inputComp.vue' /* webpackChunkName: "components/input/inputComp" */).then(c => c.default || c)
export const LazyMainNavComp = import('../../components/nav/MainNavComp.vue' /* webpackChunkName: "components/nav/MainNavComp" */).then(c => c.default || c)
