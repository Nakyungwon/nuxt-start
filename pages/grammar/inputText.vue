<template>
  <div>
    <input type="text" :value="msg" @input="changeMessageComp" />
    <p>{{ messageComp }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return { messageComp: '' }
  },
  methods: {
    changeMessageComp(eventaa) {
      this.messageComp = eventaa.target.value
      this.$emit('messagCompChanged', this.messageComp)
    },
  },
}
</script>

<style scoped>
div {
  border: solid 1px black;
}
</style>
