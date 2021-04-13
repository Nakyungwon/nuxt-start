<template>
  <div class="wrapper">
    <header>
      <span class="logo">logo</span>
      <!--      <div class="menu">-->
      <!--        <div class="menu_top">-->
      <!--          <ul class="menu1">-->
      <!--            <li><a href="#">NOTICE</a></li>-->
      <!--            <li><a href="#">REVIWE</a></li>-->
      <!--            <li><a href="#">Q&A</a></li>-->
      <!--            <li><a href="#">EVENT</a></li>-->
      <!--          </ul>-->
      <!--          <ul class="menu2">-->
      <!--            <li><a href="#">JOIN US</a></li>-->
      <!--            <li><a href="#">LOGIN</a></li>-->
      <!--            <li><a href="#">ORDER</a></li>-->
      <!--            <li><a href="#">MY PAGE</a></li>-->
      <!--            <li><a href="#">CART</a></li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--        <div class="menu_bottom">-->
      <!--          <ul class="menu3">-->
      <!--            <li><a href="#">BEST 20</a></li>-->
      <!--            <li><a href="#">NEW 5%</a></li>-->
      <!--            <li><a href="#">OUTER</a></li>-->
      <!--            <li><a href="#">TOP</a></li>-->
      <!--            <li><a href="#">DRESS</a></li>-->
      <!--            <li><a href="#">BOTTON</a></li>-->
      <!--            <li><a href="#">ACC</a></li>-->
      <!--            <li><a href="#">SALE</a></li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--      </div>-->
    </header>
    <section>
      <container></container>
      <container>s</container>
      <container>s</container>
    </section>
    <footer>꼬리</footer>
  </div>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style scoped lang="scss">
* {
  border: solid 1px gray;
}
.wrapper {
  overflow: hidden;
  margin: 0px auto;

  header {
    //position: relative;
    position: relative;
    height: 300px;
    max-width: 1532px;
    min-width: 1080px;
    margin: 0px auto;

    .logo {
      position: absolute;
      top: 20px;
      left: 2%;
      font-size: 3rem;
    }
  }

  section {
    max-width: 1570px;
    margin: 0px auto;
    padding: 0px 5%;
    width: 100%;

    container {
      display: block;
      height: 350px;
    }
  }

  footer {
    height: 300px;
    max-width: 1532px;
    min-width: 1080px;
    margin: 0px auto;
  }
}

//header,
//footer,
//container {
//  display: block;
//}
//
//header,
//footer {
//  height: 300px;
//  max-width: 1532px;
//  min-width: 1080px;
//  margin: 0px auto;
//}
//container {
//  width: 100%;
//  height: 350px;
//}
//
//section {
//  max-width: 1570px;
//  margin: 0px auto;
//  padding: 0px 5%;
//  width: 100%;
//}
</style>
