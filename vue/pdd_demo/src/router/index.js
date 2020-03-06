//引入对应模块
import Vue from 'vue'
import VueRouter from 'vue-router'

//配置一级路由
import Home from './../pages/Home/Home'
import Chat from './../pages/Chat/Chat'
import Search from './../pages/Search/Search'
import Me from './../pages/Me/Me'
import Recommend from './../pages/Recommend/Recommend'

//配置home的二级路由
import Hot from '../pages/Home/Children/Hot/Hot'
import Dress from './../pages/Home/Children/Dress'
import Box from './../pages/Home/Children/Box'
import Mbaby from './../pages/Home/Children/Mbaby'
import General from './../pages/Home/Children/General'
import Food from './../pages/Home/Children/Food'
import Shirt from './../pages/Home/Children/Shirt'
import Man from './../pages/Home/Children/Man'
import Ele from './../pages/Home/Children/Ele'

//声明使用
Vue.use(VueRouter);

//输出路由对象
export  default new VueRouter({
 //配置一级路由
    routes:[
      {
        path:'/home',
        component:Home,
        children:[
          {path:'hot',component:Hot},
          {path:'dress',component:Dress},
          {path:'box',component:Box},
          {path:'mbaby',component:Mbaby},
          {path:'General',component:General},
          {path:'food',component:Food},
          {path:'shirt',component:Shirt},
          {path:'man',component:Man},
          {path:'ele',component:Ele},
          {path:'/home', redirect:'/home/hot'},

        ]
      },
      {
        path:'/recommend',
        component:Recommend
      },
      {
        path:'/search',
        component:Search
      },
      {
        path:'/chat',
        component:Chat
      },
      {
        path:'/me',
        component:Me
      },
      {
        path:'/',
        redirect:'/home'
      },
    ]
});
