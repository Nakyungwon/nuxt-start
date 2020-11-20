<template>
  <div class="container">
    <div>
      <NavigationTest></NavigationTest>
    </div>
    <v-card>
      <v-card-title> hello??? </v-card-title>
      <v-card-title> {{ message }} </v-card-title>
      <v-card-title> ---- </v-card-title>
      <v-card-title> {{ base_dir }} </v-card-title>
      <v-card-title> ---- </v-card-title>
      <v-card-text>
        <v-textarea v-model="txt" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="test"> test </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NavigationTest from '@/components/NavigationTest'

export default {
  name: 'Test',
  components: { NavigationTest },
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
