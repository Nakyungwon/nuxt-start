<template>
  <card>
    <h4 slot="header" class="card-title">LOG IN</h4>
    <form>
      <div class="row">
        <div class="col-md-12">
          <base-input v-model="user.id" type="text" label="ID" placeholder="ID">
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <base-input
            v-model="user.password"
            type="password"
            label="password"
            placeholder="PASSWORD"
          >
          </base-input>
        </div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-info btn-fill float-right"
          @click.prevent="loginUser"
        >
          LOG IN
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>

<script>
export default {
  name: 'LoginComp',
  data() {
    return {
      user: {
        id: '',
        password: '',
      },
    }
  },
}
</script>

<style scoped></style>
