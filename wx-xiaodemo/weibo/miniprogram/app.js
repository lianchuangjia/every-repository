//app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if(!wx.cloud){
      console.error('请使用2.2.3或以上的基础库以使用云能力')
    }else{
      wx.cloud.init({
        traceUser:true,
        env:'yunkaifa-131-huanji-m46hd'
      })
    }

   //存储用户信息
   this.globalData={}
   //调用方法
  this.loadUserInfo();
  
  },
 //用户授权信息是否有保存
  loadUserInfo:function(){
    const that =this;
    //getSetting获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success:res=>{
        // console.log(res);
     const isUserInfo=res.authSetting['scope.userInfo'];
     //得到用户信息isUserInfo
     if(isUserInfo){
       wx.getUserInfo({
         success: function(res){
            // console.log(res);
           const userInfo=res.userInfo;
           //保存到globalData
         that.globalData.userInfo=userInfo;
         }
       });
       wx.cloud.callFunction({
         name:"login",
         success:res=>{
        
           const openId = res.result.openid;
           that.globalData.userInfo.userId = openId;
         }
       })
     }



      }
    });
  },
//判断有没有用户数据
  is_login:function(){
     if(this.globalData.userInfo){
       return true;
      
     }else{
       return false;
     }
  },

//得到的用户信息写入用户数据集合空数组globalData中
  setUserInfo:function(userInfo){
     this.globalData.userInfo=userInfo

  }

  
})
