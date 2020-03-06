<template>
    <div class="hot-nav">
      <!--滚动区域-->
      <div class="hot-nav-content">
        <div class="nav-content-inner">
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon01.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon02.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon03.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon04.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon05.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon06.gif">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon07.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon08.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon09.png">
            <span>1</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon10.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon11.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon12.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon13.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon14.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon15.png">
            <span>限时抢购</span>
          </a>
          <a class="inner-item">
            <img src="./../../imgs/nav/nav_icon16.png">
            <span>限时抢购</span>
          </a>
        </div>
      </div>
      <!--进度条-->
      <div class="hot-nav-bottom">
        <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HotNav",
      data(){
          return{
            // 1. 屏幕的宽度
            screenW: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            // 2. 滚动内容的宽度
            scrollContentW: 720,
            // 3. 滚动条背景的长度
            bgBarW: 100,
            // 4. 滚动条的长度
            barXWidth: 0,
            // 5. 起点
            startX: 0,
            // 6. 记录结束点
            endFlag: 0,
            // 7. 移动的距离
            barMoveWidth: 0
          }
      },
      computed:{
        innerBarStyle(){
          return {
            width: `${this.barXWidth}px`,
            left: `${this.barMoveWidth}px`
          }
        }
      },
      mounted(){
       this.getBottomBarWidth();
       this.bindEvent();
      },
      methods:{
        // 获取滚动条的长度
        getBottomBarWidth(){
          this.barXWidth = this.bgBarW * (this.screenW / this.scrollContentW)
        },
        bindEvent(){
          this.$el.addEventListener('touchstart',this.handleTouchStart,false);
          this.$el.addEventListener('touchmove',this.handleTouchMove,false);
          this.$el.addEventListener('touchend',this.handleTouchEnd,false);
        },
        //开始触摸
        handleTouchStart(event){
          // console.log('开始触摸');
           let touch=event.touches[0];
           this.startX = Number(touch.pageX);
          // console.log(this.startX);
        },
        //开始移动
        handleTouchMove(event){
          // console.log('开始触摸');
           let touch = event.touches[0];
           let moveWidth = Number(touch.pageX) - this.startX;
          // console.log(moveWidth+'移动距离');
          //求出滚动条走的距离
          this.barMoveWidth=-((this.bgBarW/this.scrollContentW)*moveWidth-this.endFlag);
          //边界值处理
          if(this.barMoveWidth <= 0){ // 左边
            this.barMoveWidth = 0;
          }else if(this.barMoveWidth >= this.bgBarW - this.barXWidth){ // 右边
            this.barMoveWidth = this.bgBarW - this.barXWidth;
          }
        },
        //停止触摸
        handleTouchEnd(){
          // console.log('停止触摸');
           this.endFlag = this.barMoveWidth;

        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.hot-nav
  width 100%
  height 180px
  position relative
  background-color #fff
  padding-bottom 10px
  .hot-nav-content
    width 100%
    overflow-x scroll
    .nav-content-inner
        width 720px
        height 180px
        display flex
        flex-wrap wrap
        .inner-item
            width 90px
            height 90px
            display flex
            flex-direction column
            justify-content center
            align-items center
            font-size 14px
            color #666666
            img
              width 40%
              margin-bottom 5px
  .hot-nav-content::-webkit-scrollbar
          display none
  .hot-nav-bottom
    width 100px
    height 2px
    background-color #FAEBD7
    position absolute
    left 50%
    margin-left -50px
    bottom 8px
    .hot-nav-bottom-inner
      position absolute
      left 0
      height 100%
      background-color orangered
      width 0


</style>
