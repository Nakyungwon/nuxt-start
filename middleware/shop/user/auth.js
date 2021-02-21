export default function ({ app }) {
  app.router.beforeResolve((to, from, next) => {
    if (app.store.getters.isLoggedIn) {
      next('/resource')
    } else {
      next()
    }
  })
}
