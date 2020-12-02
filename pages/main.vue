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
    <!--    <inputCompTest-->
    <!--      v-model="username"-->
    <!--      required-->
    <!--      placeholder="Enter your username"-->
    <!--    ></inputCompTest>-->
    <inputCompTest
      v-model="username"
      required
      placeholder="Enter your username"
      @blur="Tlqkf"
    ></inputCompTest>
    <ForComp :links="links"></ForComp>
    <h1>{{ message }}</h1>
    <!--    v-bind:msg=message로 넘겨서 @messagCompChanged emit과 맞춘다 -->
    <inputText :msg="message" @messagCompChanged="message = $event"></inputText>
  </div>
</template>

<script>
// import NavigationTest from '@/components/NavigationTest'
import inputCompTest from '@/components/input/inputCompTest'
import ForComp from '@/pages/grammar/for'
import inputText from '@/pages/grammar/inputText'

import Table from '@/components/Table'
export default {
  name: 'Main',
  components: { Table, inputCompTest, ForComp, inputText },
  // components: { NavigationTest },
  data() {
    return {
      message: '',
      txt: process.env.STAGE,
      username: '',
      userpassword: 'a',
      links: [{ url: 'http://www.naver.com' }, { url: 'http://www.daum.com' }],
    }
  },
  computed: {
    // message() {
    //   return process.env.STAGE
    // },
    base_dir() {
      return process.env.BASE_DIR
    },
  },
  methods: {
    Tlqkf($evn) {
      console.log(this.username)
    },
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
