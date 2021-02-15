<template>
  <div>
    <NavBar />
    <div class="main">
      <div class="container">
        <section class="top"></section>
        <section class="middle">
          <div class="half_divide">
            <div></div>
            <div>
              <b-button
                squared
                variant="outline-secondary"
                class="regist_button"
                @click="toRegistpage()"
                >등록</b-button
              >
              <!--                @click="$router.push('/board/regist')"-->
            </div>
          </div>
          <div><b-table hover :items="items" :fields="fields"></b-table></div>
        </section>
        <section class="bottom"></section>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav/NavBar'
export default {
  components: { NavBar },
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: [],
      },
      foods: [
        { text: 'Select One', value: null },
        'Carrots',
        'Beans',
        'Tomatoes',
        'Corn',
      ],
      show: true,
      fields: ['age', 'first_name', 'last_name'],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    toRegistpage() {
      this.$router.push('/board/regist')
      // location.href = '/board/regist'
    },
  },
}
</script>

<style lang="scss" scoped></style>
