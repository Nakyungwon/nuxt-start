<template>
  <header>
    <div class="header_top" @click.prevent="goHome">logo</div>
    <div class="menu_1">
      <ul class="inner_left">
        <li v-for="menu in top_left_menus" :key="menu.id">
          <a @click.prevent="vuexFunc(menu.func, menu.funcMode, menu.param)">{{
            menu.name
          }}</a>
        </li>
      </ul>
      <ul v-if="user" class="inner_right">
        <li>
          <a>{{ $store.state.shop.username }} 님 환영합니다.</a>
          <a @click.prevent="decodeToken">decodeToken</a>
        </li>
        <li>
          <a @click.prevent="userLogout">logout</a>
        </li>
      </ul>
      <ul v-else class="inner_right">
        <li v-for="menu in top_right_menus" :key="menu.id">
          <a
            class="pointer"
            @click.prevent="vuexFunc(menu.func, menu.funcMode, menu.param)"
            >{{ menu.name }}
          </a>
        </li>
        <!--        <li>-->
        <!--          <input v-model="userId" type="text" @change="inputId" />-->
        <!--        </li>-->
      </ul>
    </div>
    <div class="menu_2">
      <ul class="inner_left">
        <li v-for="menu in bottom_menus" :key="menu.id">
          {{ menu.name }}
        </li>
      </ul>
    </div>
    <ModalArea
      v-if="isModalViewed"
      @close-modal="vuexFunc('userModal', 'mutations', false)"
    >
      <LoginFormat />
    </ModalArea>
    <ModalArea
      v-if="isSignUpViewed"
      @close-modal="vuexFunc('siginupModal', 'mutations', false)"
    >
      <signUp />
    </ModalArea>
  </header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ModalArea from '@/pages/shop/modal/modalArea'
import LoginFormat from '@/pages/shop/user/loginFormat'
import signUp from '@/pages/shop/user/signUp'
// import { loginddd } from '@/plugins/shop/auth'
// const { mapState, mapMutations } = createNamespacedHelpers('shop')
const { mapState, mapMutations } = createNamespacedHelpers('shop')
export default {
  name: 'Header',
  components: { LoginFormat, ModalArea, signUp },
  data() {
    return {
      userId: '',
      form: {
        email: '',
        password: '',
      },
    }
  },
  // beforeCreate() {
  //   this.$store.dispatch('getUserInfo')
  // },
  created() {
    // console.log(this.$auth)
    // this.$store.dispatch('shop/getUserInfo')
  },
  computed: {
    ...mapState([
      'top_left_menus',
      'top_right_menus',
      'bottom_menus',
      'loggedIn',
      'username',
      'isModalViewed',
      'isLoginViewed',
      'isSignUpViewed',
      'user',
    ]),
  },
  mounted() {
    // Kakao.init('f75e3d96e5687692bf1fc46b5b360d41')
  },
  methods: {
    ...mapMutations(['inputLoginText']),
    inputId() {
      // this.$store.commit('shop/inputLoginText', this.userId)
      this.inputLoginText(this.userId)
      // this.$store.commit('shop/inputLoginText', this.userId)
    },
    addMain() {
      this.$store.commit('shop/addMain')
    },
    vuexFunc(func, funcMode, param) {
      if (funcMode === 'mutations') {
        this.$store.commit('shop/' + func, param)
      } else {
        // this.$auth.loginWith('local', {
        //   data: { id: this.userId },
        // })
        this.$store.dispatch('shop/' + func, param)
      }
    },

    goHome() {
      this.$router.push('/shop')
    },
    userLogout() {
      this.$store.commit('shop/logout')
    },
    decodeToken() {
      this.$authentication.decodeToken()
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  //position: relative;
  //display: block;
  //width: 100%;
  //height: 300px;
  border: 1px solid black;
  position: relative;
  display: block;
  width: 100%;
  max-width: 1532px;
  min-width: 1080px;
  margin: auto 0;
  height: 300px;
  * {
    border: 1px solid black;
  }
}
.header_top {
  top: 40px;
  left: 5%;
  position: absolute;
}
.menu {
  &_1 {
    position: absolute;
    top: 170px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5%;
  }
  &_2 {
    position: absolute;
    top: 220px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5%;
  }
}
.inner {
  &_right {
    li {
      float: right;
      list-style: none;
    }
  }

  &_left {
    li {
      float: left;
      list-style: none;
    }
  }
}
</style>
