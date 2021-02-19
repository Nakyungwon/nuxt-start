<template>
  <section class="container">
    <ul>
      <li v-for="item in todos" :key="item.id">
        <input type="checkbox" :checked="item.done" @change="toggle(item)" />
        <span :class="{ done: item.done }">{{ item.title }}</span>
        <button @click="remove(item)">지우기</button>
      </li>
    </ul>
    <p>
      <input
        v-model="todoTitle"
        type="text"
        placeholder="할 일을 적으셈"
        @keyup.enter="addTodo"
      />
      <button @click="addTodo">입력</button>
      <button @click="increment(3)">카운</button>
      <span>{{ vueText }}</span>
    </p>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'VuexTodo',
  data() {
    return { todoTitle: '' }
  },
  computed: {
    todos() {
      return this.$store.state.todo.list
    },
    vueText() {
      return this.$store.state.vuexTest.counter
    },
  },
  methods: {
    increment(val) {
      this.$store.commit('vuexTest/increment', val)
    },
    // ...mapMutations({ increment: 'vuexTest/increment' }),
    addTodo() {
      this.$store.commit('todo/add', this.todoTitle)
      this.todoTitle = ''
    },
    ...mapMutations({ toggle: 'todo/toggle', remove: 'todo/remove' }),
  },
}
</script>

<style scoped></style>
