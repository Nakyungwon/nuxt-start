<template>
  <div :id="dataIssue">
    {{ dataIssue }}
  </div>
</template>

<script>
export default {
  name: 'Convention',
  inheritAttrs: false,
  props: {
    dataIssue: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
}
</script>

<style scoped>
div {
  border: solid 1px black;
}
</style>
