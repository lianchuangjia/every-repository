<template>
    <div class="shop-contanier">
      <ul class="shop-list">
        <li class="shop-list-item">
          <img src="./../../imgs/shop_list/shop_item.png" width="100%">
          <h4>出版社此案时擦拭hi收到货撒蒂萨胜多负少的聚合法</h4>
          <div class="list-item-bottom">
            <span class="item-price">$26.9</span>
            <span class="item-counter">已拼3434件</span>
            <span class="item-user">
              <img src="./../../imgs/shop_list/user1.jpg" >
              <img src="./../../imgs/shop_list/user2.jpg">
            </span>
            <span class="item-buy">
              <button>去拼单</button>
            </span>
          </div>
        </li>
        <li class="shop-list-item">
          <img src="./../../imgs/shop_list/shop_item.png" width="100%">
          <h4>出版社此案时擦拭hi收到货撒蒂萨胜多负少的聚合法</h4>
          <div class="list-item-bottom">
            <span class="item-price">$26.9</span>
            <span class="item-counter">已拼3434件</span>
            <span class="item-user">
              <img src="./../../imgs/shop_list/user1.jpg" >
              <img src="./../../imgs/shop_list/user2.jpg">
            </span>
            <span class="item-buy">
              <button>去拼单</button>
            </span>
          </div>
        </li>
        <li class="shop-list-item">
          <img src="./../../imgs/shop_list/shop_item.png" width="100%">
          <h4 class="list-item-title">出版社此案时擦拭hi收到货撒蒂萨胜多负少的聚合法</h4>
          <div class="list-item-bottom">
            <span class="item-price">$26.9</span>
            <span class="item-counter">已拼3434件</span>
            <span class="item-user">
              <img src="./../../imgs/shop_list/user1.jpg" >
              <img src="./../../imgs/shop_list/user2.jpg">
            </span>
            <span class="item-buy">
              <button>去拼单</button>
            </span>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "HotShopList"
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.shop-contanier
  background-color #f5f5f5
  margin-bottom 50px
  .shop-list
    .shop-list-item
      margin-bottom 10px
      background-color #fff
      display flex
      flex-direction column
      .list-item-title
        line-height 23px
        width 94%
        margin-left 3%
        height 44px
        overflow hidden
      .list-item-bottom
        margin 10px 0
        display flex
        flex-direction row
        justify-content space-around
        align-items center
        .item-price
          font-size 18px
          text-align center
          font-weight bolder
          color red
          flex 1
        .item-counter
          flex 2
          font-size 12px
          color #cccccc
        .item-user
          display flex
          flex-direction row
          img
            width 30px
            border-radius 50%
          img:nth-child(2)
            margin-left -6px
        .item-buy
          flex 2
          button
            width 80%
            height 34px
            color #fff
            font-size 15px
            display flex
            justify-content center
            align-items center
            margin-left 10px
            background-color red
            border-radius 8px
            border none

</style>
