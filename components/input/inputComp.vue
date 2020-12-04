<template>
  <!--  <ValidationProvider rules="required|email" mode="eager" name="ID">-->
  <ValidationProvider v-bind="$attrs.validation">
    <!--    :rules="validationRules"-->
    <!--    :mode="validationMode"-->
    <!--    :name="validationName"-->
    <!--    <b-form-group slot-scope="{ valid, errors }">-->
    <!--      <b-form-input-->
    <!--        :id="inputID"-->
    <!--        v-model="inputValue"-->
    <!--        :state="errors[0] ? false : valid ? true : null"-->
    <!--        :placeholder="inputPlaceHolder"-->
    <!--        :type="inputType"-->
    <!--        @input="vmodelChange"-->
    <!--      ></b-form-input>-->
    <!--      &lt;!&ndash;      v-model="vModelValue"&ndash;&gt;-->
    <!--      &lt;!&ndash;      :v-model="vmodel"&ndash;&gt;-->
    <!--      &lt;!&ndash;label="Name"&ndash;&gt;-->
    <!--      <b-form-invalid-feedback>-->
    <!--        {{ errors[0] }}-->
    <!--      </b-form-invalid-feedback>-->
    <!--    </b-form-group>-->

    <b-form-group slot-scope="{ valid, errors }">
      <!--      <b-form-input v-bind="$attrs" @input="vmodelChange"></b-form-input>-->
      <b-form-input
        v-bind="$attrs.input"
        :state="errors[0] ? false : valid ? true : null"
        v-on="$listeners"
      ></b-form-input>
      <!--      :id="inputId"-->
      <!--        :value="value"-->
      <!--      :label="inputLabel"-->
      <!--        :placeholder="inputPlaceholder"-->
      <!--        :required="inputRequired"-->
      <!--        :type="inputType"-->
      <!--      v-model="vModelValue"-->
      <!--      :v-model="vmodel"-->
      <!--label="Name"-->
      <b-form-invalid-feedback>
        {{ errors[0] }}
      </b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Input',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    // value: {},
    validationRules: {
      type: String,
      default: () => {
        return ''
      },
    },
    validationMode: {
      type: String,
      default: () => {
        return ''
      },
    },
    validationName: {
      type: String,
      default: () => {
        return ''
      },
    },
    value: {
      type: String,
      default: () => {
        return ''
      },
    },
    inputPlaceHolder: {
      type: String,
      default: () => {
        return ''
      },
    },
    inputType: {
      type: String,
      default: () => {
        return 'text'
      },
    },
    inputLabel: {
      default: () => {
        return 'label'
      },
    },
    inputId: {
      default: () => {
        return 'ID'
      },
    },
    inputPlaceholder: {
      default: () => {
        return 'placeholder'
      },
    },
    inputRequired: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  // data() {
  //   return {
  //     // mutableList: JSON.parse(this.list),
  //     inputID: '',
  //     inputValue: '',
  //   }
  // },
  // mounted() {
  //   this.inputID = this.$props.validationName + '-input'
  //   this.vModelValue = this.$props.value
  // },
  // methods: {
  //   vmodelChange($event) {
  //     console.log($event)
  //     this.$emit('update-value', this.inputValue)
  //   },
  // },
}
</script>

<style scoped></style>
