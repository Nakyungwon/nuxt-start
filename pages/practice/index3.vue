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
      <div class="part">
        <div class="wrapper_carousel">
          <ul class="carousel">
            <li>
              <img src="@/assets/images/practice/mimg01.jpeg" alt="그림없음" />
            </li>
            <li>
              <img src="@/assets/images/practice/mimg02.jpeg" alt="그림없음" />
            </li>
            <li>
              <img src="@/assets/images/practice/mimg03.jpeg" alt="그림없음" />
            </li>
          </ul>
          <div class="direction">
            <a class="previous on_off_effect">Prev</a>
            <a class="next on_off_effect">Next</a>
          </div>
        </div>
      </div>
      <div class="part">그림 베스트</div>
      <div class="part">실시간 베스트</div>
      <div class="part">키워드</div>
      <div class="part">따상</div>
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

header,
footer {
  height: 300px;
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
  display: flex;
  flex-direction: column;
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

div {
  box-sizing: content-box;
}
.logo {
  position: absolute;
  top: 20px;
  left: 2%;
  font-size: 3rem;
}

header {
  position: relative;
}

.menu {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  a {
    font-size: 12px;
    padding: 0 20px 0 10px;
    line-height: 49px;
    text-align: center;
  }
}
.menu_top {
  display: flex;
  width: 100%;
  .menu2 {
    justify-content: flex-end;
  }
}
.menu_bottom {
  display: flex;
  width: 100%;
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

// main
.part {
  padding: 0 2% 0 2%;
  img {
    height: auto;
    max-width: 100%;
    width: 100%;
  }
}
.wrapper_carousel {
  cursor: pointer;
  position: relative;
  .on_off_effect {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
}
.wrapper_carousel:hover {
  .on_off_effect {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }
}

.carousel {
  position: relative;
  display: block;
  height: 357px;
  overflow: hidden;
  //overflow-x: hidden;
  li {
    width: 100%;
    height: inherit;
    img {
      max-width: 100%;
      height: inherit;
    }
  }
  //li:first-child {
  //  width: 100%;
  //  height: inherit;
  //}
}

.direction {
  position: absolute;
  width: 100%;
  top: 50%;
  display: flex;
  a {
    width: 50px;
    height: 77px;
  }
  .previous {
    position: absolute;
    left: 0;
    margin-top: -39px;
    margin-left: 20px;
    text-indent: -9999999px;
    background: rgba(255, 255, 255, 0.9)
      url('~assets/images/practice/controls.png') no-repeat 10px -77px;
  }
  .next {
    position: absolute;
    right: 0;
    margin-top: -39px;
    margin-right: 20px;
    text-indent: -999999px;
    background: rgba(255, 255, 255, 0.9)
      url('~assets/images/practice/controls.png') no-repeat -40px -77px;
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
