export const actions = {
  // async nuxtServerInit({ dispatch }, ctx) {
  //   const { res, req, app, store, route } = ctx
  //   const specs = {
  //     ...app.$device,
  //     responsiveDevice: ctx.isMobileOrTablet ? 'mobile' : 'desktop'
  //   }
  //   dispatch('device/setDevice', specs)
  //   await dispatch('auth/refreshUser')
  //   // const layoutProps =
  //   //   route.path === '/'
  //   //     ? { theme: 'gradient', feature: 'open', backTop: true, topNotice: true }
  //   //     : {
  //   //         affix: false,
  //   //         theme: 'white',
  //   //         feature: 'open',
  //   //         hideLeft: false,
  //   //         hideRight: false,
  //   //         backTop: false,
  //   //         topNotice: false,
  //   //         hideGNB: false,
  //   //         hideFooter: false,
  //   //         backButton: false
  //   //       }
  // }
  async nuxtServerInit() {
    await console.log('nuxt server Init...')
  },
}

export default {
  actions,
}
