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
    <ForComp :links="links"></ForComp>
    <h1>{{ message }}</h1>
    <!--    v-bind:msg=message로 넘겨서 @messagCompChanged emit과 맞춘다 -->
    <inputText :msg="message" @messagCompChanged="message = $event"></inputText>
    <inputListener
      :value:="listenerMessage"
      test-a="sword"
      test-b="blade"
      :type="message"
    ></inputListener>
    <!--    <input @blur="console.log($event)" />-->
    <!--      v-model="listenerMessage"-->
    <!--    @input="listenerInput"-->
    <convention data-issue="aaaa"></convention>
  </div>
</template>

<script>
// import NavigationTest from '@/components/NavigationTest'
import ForComp from '@/pages/grammar/for'
import inputText from '@/pages/grammar/inputText'
import inputListener from '@/pages/grammar/listener'
import convention from '@/pages/grammar/convention'

import Table from '@/components/Table'
export default {
  name: 'Main',
  components: {
    Table,
    ForComp,
    inputText,
    inputListener,
    convention,
  },
  // components: { NavigationTest },
  data() {
    return {
      message: 'aa',
      listenerMessage: '',
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
    listenerInput(value) {
      this.listenerMessage = value
    },
    async test() {
      const r = await this.$axios.get('/api')
      this.txt = r.data
    },
  },
}
</script>
