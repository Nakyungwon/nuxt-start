<template>
  <div>
    <span>{{ $attrs }}</span>
    <!--    <input v-bind="$attrs" />-->
    <input v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: 'Listener',
  // inheritAttrs: false,
  props: {},
}
</script>

<style scoped>
div {
  border: solid 1px black;
}
</style>
