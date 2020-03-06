<template>
   <div class="bottom-tab">
     <span class="tab-item" @click="switchTo('/home')">
       <img :src="$route.path.includes('/home') ? tabBarImgArr[0].selected : tabBarImgArr[0].normal "  >
       <span :class="{on:'/home' === $route.path}">首页</span>
     </span>
     <span class="tab-item" @click="switchTo('/recommend')">
       <img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected : tabBarImgArr[1].normal ">
       <span :class="{on:'/recommend' === $route.path}">推荐</span>
     </span>
     <span class="tab-item" @click="switchTo('/search')">
       <img :src="$route.path.includes('/search') ? tabBarImgArr[2].selected : tabBarImgArr[2].normal ">
       <span :class="{on:'/search' === $route.path}">搜索</span>
     </span>
     <span class="tab-item" @click="switchTo('/chat')">
       <img :src="$route.path.includes('/chat') ? tabBarImgArr[3].selected : tabBarImgArr[3].normal ">
       <span :class="{on:'/chat' === $route.path}">聊天</span>
     </span>
     <span class="tab-item" @click="switchTo('/me')">
       <img :src="$route.path.includes('/me') ? tabBarImgArr[4].selected : tabBarImgArr[4].normal ">
       <span :class="{on:'/me' === $route.path}">个人中心</span>
     </span>
   </div>
</template>

<script>
    export default {
        name: "TabBar",
      data(){
          return {
            tabBarImgArr:[
              {normal:require('./../../../static/img/icon_home.png'),
                selected:require('./../../../static/img/icon_home_seleted.png')},
              {normal:require('./../../../static/img/icon_recommend.png'),
                selected:require('./../../../static/img/icon_recommend_seleted.png')},
              {normal:require('./../../../static/img/icon_search.png'),
                selected:require('./../../../static/img/icon_search_seleted.png')},
              {normal:require('./../../../static/img/icon_chat.png'),
                selected:require('./../../../static/img/icon_chat_seleted.png')},
              {normal:require('./../../../static/img/icon_me.png'),
                selected:require('./../../../static/img/icon_me_seleted.png')}

            ]
          }
      },
      methods:{
        switchTo(path){
          // console.log(this.$router);
          this.$router.replace(path);
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.bottom-tab
  width 100%
  height 50px
  position fixed
  display: flex
  background-color aqua
  z-index 999
  left 0
  bottom 0
  .tab-item
    display flex
    flex 1
    flex-direction column
    align-items center
    justify-content center
    font-size 14px
    color #666
    img
      width 35%
      margin-bottom 2px
    .on
       color #FF8C69

</style>
