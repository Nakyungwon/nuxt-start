export const state = () => ({ counter: 0, list: [] })
export const mutations = {
  add: (state, text) => {
    state.counter++
    const item = { id: state.counter, title: text, done: false }
    state.list.push(item)
  },
  remove: (state, todo) => {
    const list = state.list
    list.splice(list.indexOf(todo), 1)
  },
  toggle: (state, todo) => {
    todo.done = !todo.done
  },
}
