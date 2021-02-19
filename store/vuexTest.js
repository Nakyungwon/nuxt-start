export const state = () => ({ counter: 0 })
export const mutations = {
  increment(state, val) {
    // state.counter++
    state.counter = val
  },
}
