<template>
    <div class="hot">
      <!--轮播图-->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="../../imgs/rowing/s1.png" width="100%"></div>
          <div class="swiper-slide"><img src="../../imgs/rowing/s2.png" width="100%"></div>
          <div class="swiper-slide"><img src="../../imgs/rowing/s3.png" width="100%"></div>
          <div class="swiper-slide"><img src="../../imgs/rowing/s3.png" width="100%"></div>
          <div class="swiper-slide"><img src="../../imgs/rowing/s5.png" width="100%"></div>
          <div class="swiper-slide"><img src="../../imgs/rowing/s6.png" width="100%"></div>
          <div class="swiper-slide"><img src="../../imgs/rowing/s7.png" width="100%"></div>
        </div>
        <!--分页器-->
        <div class="swiper-pagination"></div>
      </div>
      <!--hot导航栏-->
      <hot-nav></hot-nav>
      <!--hot广告位-->
      <div class="hot-ad">
          <img src="./../../imgs/hot_ad/home_ad.gif" width="100%">
      </div>
      <!--hot-shop-list-->
      <hot-shop-list/>
    </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/css/swiper.css'
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'

    export default {
        name: "Hot",
      components:{
        HotNav,
        HotShopList
      },
        mounted() {
          //创建swiper实例

          new Swiper('.swiper-container',{
            autoplay:true,
            loop:true,
            pagination:{
              el:'.swiper-pagination',
            }
          })

        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot
    width 100%
    height 100%
    background #f5f5f5
    padding-top 46px
    .hot-ad
      background-color #fff
      padding 5px
      margin 8px 0

</style>
