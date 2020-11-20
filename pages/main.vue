<template>
  <div>
    <Table />
    <H1> Hi </H1>
  </div>
</template>

<script>
// import NavigationTest from '@/components/NavigationTest'

import Table from '@/components/Table'
export default {
  name: 'Main',
  components: { Table },
  // components: { NavigationTest },
  data() {
    return {
      txt: process.env.STAGE,
    }
  },
  computed: {
    message() {
      return process.env.STAGE
    },
    base_dir() {
      return process.env.BASE_DIR
    },
  },
  methods: {
    async test() {
      const r = await this.$axios.get('/api')
      // console.log('adfasdf')
      this.txt = r.data
    },
  },
}
</script>

<!--<style scoped>-->
<!--</style>-->
