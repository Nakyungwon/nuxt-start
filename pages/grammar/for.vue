<template>
  <div class="for">
    <span>---------------</span>
    <a v-for="link in links" :key="link" :href="link.url">{{ link.url }}</a>
    <span>---------------</span>
  </div>
</template>

<script>
export default {
  name: 'ForComp',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
a {
  display: block;
}
.for {
  border: solid 1px black;
}
</style>
