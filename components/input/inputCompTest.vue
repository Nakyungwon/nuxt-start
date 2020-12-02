<template>
  <div class="basic-input">
    <!--    <Input v-bind="$attrs" :placeholder="placeholder" v-on="$listeners" />-->
    <!--          @input="$emit('input', $event.target.value)"-->
    <input v-bind="$attrs" :value="value" v-on="$listeners" />
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'InputTest',
  // props: {
  // placeholder: {
  //   type: String,
  //   default: '',
  // },
  // },
  inheritAttrs: false,
  props: ['value'],
}
</script>

<style scoped>
.basic-input {
  border: solid 1px black;
}
</style>
