<template>
  <div class="wrapper">
    <header>
      <span class="logo">logo</span>
      <div class="menu">
        <div class="menu_top">
          <ul class="flex_start">
            <li><a href="#">NOTICE</a></li>
            <li><a href="#">REVIWE</a></li>
            <li><a href="#">Q&A</a></li>
            <li><a href="#">EVENT</a></li>
          </ul>
          <ul class="flex_end">
            <li><a href="#">JOIN US</a></li>
            <li><a href="#">LOGIN</a></li>
            <li><a href="#">ORDER</a></li>
            <li><a href="#">MY PAGE</a></li>
            <li><a href="#">CART</a></li>
          </ul>
        </div>
        <div class="menu_bottom">
          <!--          <ul class="menu3" :class="menu_class">-->
          <ul class="menu3" :class="{ fixmenu: isActive }">
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
    <section>
      <div class="container">
        <div class="img_area">
          <ul>
            <li class="caraselImgArea caraselActive">
              <img
                class="caraselImg"
                src="@/assets/images/practice/mimg03.jpeg"
                alt="그림없음"
              />
            </li>
            <li class="caraselImgArea">
              <img
                class="caraselImg"
                src="@/assets/images/practice/mimg02.jpeg"
                alt="그림없음"
              />
            </li>
            <li class="caraselImgArea">
              <img
                class="caraselImg"
                src="@/assets/images/practice/mimg01.jpeg"
                alt="그림없음"
              />
            </li>
          </ul>
          <div class="direction">
            <a class="previous" @click.prevent="caraselImg('prev')">Prev</a>
            <a class="next" @click.prevent="caraselImg('next')">Next</a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="content">
          <div class="weekly_best">
            <div class="title"><h3>WEEKLY BEST</h3></div>
            <div class="sub_menu">
              <ul>
                <li><a href="#">OUTER</a></li>
                <li><a href="#">TOP</a></li>
                <li><a href="#">DRESS</a></li>
                <li><a href="#">BOTTOM</a></li>
                <li><a href="#">ACC</a></li>
              </ul>
            </div>
          </div>
          <div>
            <ul class="product">
              <li>
                <div class="info">
                  <div class="thumnail">
                    <img
                      src="@/assets/images/practice/0005.jpeg"
                      alt="그림없음"
                    />
                  </div>
                  <div class="description">
                    <ul>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="info">
                  <div class="thumnail">
                    <img
                      src="@/assets/images/practice/0006.jpeg"
                      alt="그림없음"
                    />
                  </div>
                  <div class="description">
                    <ul>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="info">
                  <div class="thumnail">
                    <img
                      src="@/assets/images/practice/0007.jpeg"
                      alt="그림없음"
                    />
                  </div>
                  <div class="description">
                    <ul>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="info">
                  <div class="thumnail">
                    <img
                      src="@/assets/images/practice/0008.jpeg"
                      alt="그림없음"
                    />
                  </div>
                  <div class="description">
                    <ul>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="info">
                  <div class="thumnail">
                    <img
                      src="@/assets/images/practice/0009.jpeg"
                      alt="그림없음"
                    />
                  </div>
                  <div class="description">
                    <ul>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <div class="info">
                  <div class="thumnail">
                    <img
                      src="@/assets/images/practice/0005.jpeg"
                      alt="그림없음"
                    />
                  </div>
                  <div class="description">
                    <ul>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                      <li>상품 설명</li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="main_bann">
          <div class="title"><h3>TREND KEYWOARDS</h3></div>
          <div class="keyword">
            <ul>
              <li>#린넨 스터트</li>
              <li>#썸머 가디건</li>
              <li>#포켓 티셔츠</li>
              <li>#셔츠 원피스</li>
              <li>#가벼운 점프수트</li>
              <li>#스트라이프</li>
            </ul>
          </div>
          <div class="ban_items">
            <ul>
              <li>
                <img
                  src="@/assets/images/practice/mbann01.jpeg"
                  alt="그림없음"
                />
              </li>
              <li>
                <img
                  src="@/assets/images/practice/mbann02.jpeg"
                  alt="그림없음"
                />
              </li>
              <li>
                <img
                  src="@/assets/images/practice/mbann03.jpeg"
                  alt="그림없음"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <footer>꼬리</footer>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Index',
  data() {
    return {
      menu_class: 'menu3',
      isActive: false,
    }
  },
  mounted() {
    this.resiseTest()
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.resiseTest)
    setInterval(() => this.caraselImg(), 5000)
  },
  methods: {
    handleScroll(event) {
      const element = document.getElementsByClassName('menu_bottom')[0]
      const offsetY = element.getBoundingClientRect().y
      if (offsetY < 0) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    resiseTest(event) {
      const element = document.getElementsByClassName('caraselImg')[0]
      const imgHeight = element.offsetHeight + 'px'
      document.getElementsByClassName('img_area')[0].style.height = imgHeight
    },
    caraselImg(param) {
      const carealArealist = document.getElementsByClassName('caraselImgArea')
      let activeIdx = 0
      carealArealist.forEach((obj, idx) => {
        if (_.includes(obj.getAttribute('class'), 'caraselActive')) {
          activeIdx = idx
        }
      })
      if (param === 'next') {
        carealArealist[activeIdx].classList.toggle('caraselActive')
        if (activeIdx === carealArealist.length - 1) {
          carealArealist[0].classList.toggle('caraselActive')
        } else {
          carealArealist[activeIdx].nextElementSibling.classList.toggle(
            'caraselActive'
          )
        }
      } else {
        carealArealist[activeIdx].classList.toggle('caraselActive')
        if (activeIdx === 0) {
          carealArealist[carealArealist.length - 1].classList.toggle(
            'caraselActive'
          )
        } else {
          carealArealist[activeIdx].previousElementSibling.classList.toggle(
            'caraselActive'
          )
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
* {
  border: solid 1px gray;
}

.flex_end {
  justify-content: flex-end;
}
.flex_start {
  justify-content: flex-start;
}

li {
  list-style: none;
}

ul {
  padding: 0;
}

.caraselActive {
  //z-index: 2;
  opacity: 1 !important;
  transition: 1s;
}

.fixmenu {
  position: fixed;
  top: 0;
  opacity: 1;
  z-index: 99;
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
      position: relative;
      top: 70px;
      left: 5%;
      font-size: 3rem;
    }
    .menu {
      position: absolute;
      width: 100%;
      bottom: 0px;
      padding: 0 5%;
      .menu_top {
        display: flex;
        flex-direction: row;
        ul {
          display: flex;
          width: 50%;
          li {
            padding: 0 5px;
          }
        }
      }
      .menu_bottom {
        display: flex;
        flex-direction: row;
        ul {
          display: flex;
          li {
            padding: 0 5px;
          }
        }
      }
    }
  }

  section {
    max-width: 1570px;
    margin: 0px auto;
    padding: 0px 5%;
    width: 100%;

    .container {
      display: block;
      position: static;
      .img_area {
        position: relative;
        height: 375px;
        overflow: hidden;
        ul {
          position: relative;
          li {
            position: absolute;
            display: block;
            width: 100%;
            opacity: 0;
            img {
              width: 100%;
              display: block;
            }
          }
        }
        .direction {
          position: relative;
          top: 50%;
          a {
            width: 50px;
            height: 77px;
          }
          .previous {
            text-indent: -9999px;
            position: absolute;
            left: 0;
            margin-top: -39px;
            margin-left: 20px;
            background: rgba(255, 255, 255, 0.9)
              url('~assets/images/practice/controls.png') no-repeat 10px -77px;
          }
          .next {
            text-indent: -9999px;
            position: absolute;
            right: 0;
            margin-top: -39px;
            margin-right: 20px;
            background: rgba(255, 255, 255, 0.9)
              url('~assets/images/practice/controls.png') no-repeat -40px -77px;
          }
        }
      }
      .content {
        margin-top: 70px;
        width: 100%;
        .weekly_best {
          .title {
            width: 100%;
            text-align: center;
          }
          .sub_menu {
            ul {
              width: 50%;
              margin: 0px auto;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
          }
        }
        ul.product {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          li {
            width: 23.5%;
            padding: 5px;
            div.info {
              width: 100%;
              position: relative;
              &:hover {
                div.description {
                  opacity: 1;
                  bottom: 10%;
                }
              }
              div.thumnail {
                img {
                  width: 100%;
                }
              }
              div.description {
                width: 90%;
                position: absolute;
                bottom: 5%;
                border-radius: 12px;
                margin: 0 5%;
                opacity: 0;
                transition: 0.3s;

                ul {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  li {
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
      .main_bann {
        margin-top: 70px;
        background-color: rgba(150, 150, 150, 0.1);
        .title {
          width: 100%;
          text-align: center;
        }
        .keyword {
          ul {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
        }
        .ban_items {
          width: 100%;
          ul {
            width: auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: stretch;
            margin: 0 80px 0 80px;
            li {
              width: 33.3%;
              box-sizing: border-box;
              img {
                width: 100%;
              }
            }
          }
        }
      }
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
