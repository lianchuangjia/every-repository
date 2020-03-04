// miniprogram/pages/login/login.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   //绑定的授权事件 
  onGetUserInfoTap:function(event){
    //用户信息userInfo
    const userInfo =event.detail.userInfo;
    //判断是否有用户信息
    if(userInfo){
      //调用在app.js中写的把用户信息写入本地存储的方法
      app.setUserInfo(userInfo);
      //弹出对话框
      wx.showToast({
        title:"恭喜！授权成功！"
      });
      //设置1.5秒后返回上个界面
      setTimeout(()=>{
        wx.navigateBack({});
      },1500)
    }else{
      //当你第一次没有授权时
      //弹出对话框
      wx.showToast({
        title:"您拒绝了授权！"
      });
      //设置1.5秒后返回上个界面
      setTimeout(()=>{
        wx.navigateBack({});
      },1500)

    }
    





  },
  fhEvent:function(){
    wx.navigateBack({});
  }
  
})