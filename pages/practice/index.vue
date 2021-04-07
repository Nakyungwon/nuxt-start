<template>
  <div class="container">
    <header>
      <span class="logo">logo</span>
      <div class="menu">
        <div class="menu_top">
          <ul class="menu1">
            <li><a href="#">NOTICE</a></li>
            <li><a href="#">REVIWE</a></li>
            <li><a href="#">Q&A</a></li>
            <li><a href="#">EVENT</a></li>
          </ul>
          <ul class="menu2">
            <li><a href="#">JOIN US</a></li>
            <li><a href="#">LOGIN</a></li>
            <li><a href="#">ORDER</a></li>
            <li><a href="#">MY PAGE</a></li>
            <li><a href="#">CART</a></li>
          </ul>
        </div>
        <div class="menu_bottom">
          <ul class="menu3">
            <li><a href="#">BEST 20</a></li>
            <li><a href="#">NEW 5%</a></li>
            <li><a href="#">OUTER</a></li>
            <li><a href="#">TOP</a></li>
            <li><a href="#">DRESS</a></li>
            <li><a href="#">BOTTON</a></li>
            <li><a href="#">ACC</a></li>
            <li><a href="#">SALE</a></li>
          </ul>
        </div>
      </div>
    </header>
    <section class="content">
      <nav>
        <ul>
          <li><a href="#">layout1</a></li>
          <li><a href="#">layout2</a></li>
          <li><a href="#">layout3</a></li>
        </ul>
      </nav>
      <main>
        <p>시발 레이아웃 ㅈ 같네</p>
      </main>
      <aside>AD</aside>
    </section>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style scoped lang="scss">
.container,
.content,
header,
nav,
aside,
main,
span,
div,
ul,
footer {
  border: 1px solid gray;
}

ul {
  width: 100%;
  box-sizing: border-box;
}
li {
  //padding: 1% 5% 1% 5%;
  list-style: none;
}
.container {
  margin: 0 auto;
  min-width: 750px;
  width: 1532px;
  display: flex;
  flex-direction: column;
}
.content {
  width: 100%;
  //height: 500px;
  display: flex;
  //flex-direction: row;
  //flex-grow: 1;
  //align-items: stretch;
  //justify-content: center;
  nav {
    width: 100%;
  }
  aside {
    width: 100%;
  }
  main {
    width: 100%;
  }
}
header,
footer {
  height: 200px;
}

header {
  position: relative;
}

div {
  box-sizing: content-box;
}
.logo {
  //position: relative;
  position: absolute;
  top: 20px;
  left: 2%;
  font-size: 3rem;
}
.menu {
  a {
    font-size: 12px;
    padding: 0 20px 0 10px;
    line-height: 49px;
    text-align: center;
  }
}
.menu_top {
  position: absolute;
  //height: 100%;
  display: flex;
  width: 100%;
  //position: relative;
  //top: 170px;
  left: 0;
  top: 0;
}
.menu_bottom {
  position: absolute;
  //height: 100%;
  display: flex;
  width: 100%;
  //position: relative;
  bottom: 0;
  left: 0;
}
ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .menu_3 {
    flex-direction: row;
    justify-content: flex-start;
  }
}
//ul.main1 {
//  display: flex;
//  flex-direction: row;
//}
//ul.main2 {
//  display: flex;
//  flex-direction: row;
//}
</style>
