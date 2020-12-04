<template>
  <div :id="dataIssue">
    {{ dataIssue }}
  </div>
</template>

<script>
export default {
  name: 'Convention',
  inheritAttrs: false,
  props: { dataIssue: {} },
}
</script>

<style scoped>
div {
  border: solid 1px black;
}
</style>
