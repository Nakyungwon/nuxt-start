// import Vue from 'vue'
// // import { Validator } from 'vee-validate'
// import VeeValidator from 'vee-validate'
//
// const VeeValidatePlugin = {
//   install(Vue) {
//     const validator = new VeeValidator()
//     Object.defineProperties(Vue.prototype, {
//       $validator: {
//         get() {
//           return validator
//         },
//       },
//     })
//
//     // errors를 computed로 했을 경우
//     // 캐싱되어서 그런지 에러 검사 후 표시가 되지 않음
//     Vue.mixin({
//       data() {
//         return {
//           errors: validator.errorBag,
//         }
//       },
//     })
//   },
// }
//

// Vue.use(VeeValidatePlugin)
// import { extend } from 'vee-validate'
// import { required } from 'vee-validate/dist/rules'
//
// extend('required', {
//   ...required,
//   message: '필수 입력항목입니다.',
// })
//
// extend('positive', (value) => {
//   if (value >= 0) {
//     return true
//   }
//
//   // return 'This field must be a positive number'
//   return '{_field_} field must be a positive number'
// })
//
// extend('odd', (value) => {
//   if (value % 2 !== 0) {
//     return true
//   }
//
//   return 'This field must be an odd number'
// })

import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'
// import {  required, confirmed } from 'vee-validate/dist/rules'
import { email, required } from 'vee-validate/dist/rules'
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

// export default ({ app }) => {
export default () => {
  const customRules = {
    email: {
      ...email,
      message: (value) => {
        return '이메일 형식이 아닙니다.'
      },
    },
    required: {
      ...required,
      // message: app.i18n.t('필수 입력 사항입니다.')
      message: (value) => {
        return value + ' 필수 입력 사항입니다.'
      },
    },
  }
  Object.keys(customRules).forEach((rule) => {
    extend(rule, customRules[rule])
  })

  Object.keys(rules).forEach((rule) => {
    // eslint-disable-next-line import/namespace
    extend(rule, rules[rule])
  })

  Vue.config.productionTip = false
}
