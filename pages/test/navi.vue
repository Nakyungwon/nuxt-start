<template>
  <div>
    <nav>
      <input
        id="check"
        type="checkbox"
        @input="$emit('is_navi', $event.target.checked)"
      />
      <!--    @change="alertchecked($event)"-->
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
      <label class="logo">Design X</label>
      <ul>
        <li><a class="active" href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Service</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Feedback</a></li>
      </ul>
    </nav>
    <div class="cover">sdsds</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: ['Dashboard', 'Messages', 'Profile', 'Updates'],
    is_check: true,
  }),
  methods: {
    // alertchecked(evt) {
    // alert(this.is_check)
    // },
  },
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
  box-sizing: border-box;
}
body {
  font-family: montserrat;
}
nav {
  background: #0082e6;
  height: 80px;
  width: 100%;

  ul {
    float: right;
    margin-right: 20px;
    li {
      display: inline-block;
      line-height: 80px;
      margin: 0 5px;
      a {
        color: white;
        font-size: 17px;
        text-transform: uppercase;
        border-radius: 3px;
      }
    }
  }
}
a.active,
a:hover {
  background: #1b9bff;
  transition: 0.5s;
}
label.logo {
  color: white;
  font-size: 35px;
  line-height: 80px;
  padding: 0 100px;
  font-weight: bold;
}
.checkbtn {
  font-size: 30px;
  color: white;
  float: right;
  line-height: 80px;
  margin-right: 40px;
  cursor: pointer;
  display: none;
}
#check {
  display: none;
}

@media (max-width: 952px) {
  label.logo {
    font-size: 30px;
    padding-left: 50px;
  }
  nav {
    ul {
      li {
        a {
          font-size: 16px;
        }
      }
    }
  }
}
@media (max-width: 858px) {
  .checkbtn {
    display: block;
  }
  ul {
    position: fixed;
    width: 80%;
    height: 180%;
    background: #2c3e50;
    top: 80px;
    right: -100%;
    text-align: center;
    transition: all 0.5s;
  }
  nav {
    ul {
      margin-right: 0px;
      z-index: 901;
      li {
        display: block;
        margin: 50px 0;
        line-height: 30px;
        a {
          font-size: 20px;
        }
        a:hover,
        a:active {
          background: none;
          color: #0082e6;
        }
      }
    }
  }
  #check:checked ~ ul {
    right: 0;
  }

  #check:checked ~ ul {
    right: 0;
  }
  //#check:checked ~ .cover {
  //  position: fixed;
  //  top: 0;
  //  width: 100%;
  //  height: 100%;
  //  z-index: 900;
  //  background: rgba(0, 0, 0, 0.35);
  //}
}
</style>
