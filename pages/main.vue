<template>
  <div>
    <Table />
    <H1> Hi </H1>
    <div class="container">
      <main class="bd-main bd-components">
        <section class="bd-content">
          <div
            translate="translate"
            class="bd-example vue-example vue-example-b-button-solid"
          >
            <button type="button" class="btn btn-primary">Primary</button>
            <button type="button" class="btn btn-secondary">Secondary</button>
            <button type="button" class="btn btn-success">Success</button>
            <button type="button" class="btn btn-danger">Danger</button>
            <button type="button" class="btn btn-warning">Warning</button>
            <button type="button" class="btn btn-info">Info</button>
            <button type="button" class="btn btn-light">Light</button>
            <button type="button" class="btn btn-dark">Dark</button>
          </div>
        </section>
      </main>
    </div>
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
