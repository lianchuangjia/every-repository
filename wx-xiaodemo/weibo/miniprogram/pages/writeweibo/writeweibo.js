// miniprogram/pages/writeweibo/writeweibo.js
import { getUUID , getExt} from "../../utils/util.js";
const app =getApp();
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:null,
    tempImages:[]
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
   const type=options.type;
  const pages=getCurrentPages();
  const indexPage=pages[0];
  const tempImages= indexPage.data.tempImages;
  const tempVideo=indexPage.data.tempVideo;
    if (tempImages){
      this.setData({
        tempImages: tempImages
      })
    }
   
  this.setData({  
    type:type, 
    tempVideo: tempVideo
  })





   this.onImageSize();
  },

//图片size
  onImageSize: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const weiboWidth = windowWidth - 60;
    const imageSize = (weiboWidth - 2.5*3) / 3;
   
    this.setData({
      imageSize: imageSize
    
    });

  },





  openLocatinPage:function(){
    const that=this;
    //chooseLocation打开地图选择位置。
    wx.chooseLocation({
      success: function(res){
        if(res.name){
          delete res['errMsg'];
          that.setData({
            location: res
          });
        }
        
      }
    
    });     
  },
  //点击方法onLocationTap
  onLocationTap:function(event){
    const that=this;
    //getSetting获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
   wx.getSetting({
     success:res=>{
     //authSetting用户授权结果  
       const isLocation=res.authSetting['scope.userLocation'];
       if(isLocation){
          that.openLocatinPage();
        
       }else{
         //authorize向用户发起授权请求
       wx.authorize({
         scope:"scope.userLocation",
         success:res=>{
          that.openLocatinPage();
         },
         fail:res=>{
           //showModal弹出对话框
         wx.showModal({
           title:"提示",
           content: '若点击不授权，将无法使用地图位置功能',
           cancelText:'不授权',
           cancelColor:'#999',
           confirmText:'授权',
           confirmColor:'#f94218',
           success(res) {           
            if (res.confirm) {
           //   打开授权设置
              wx.openSetting({
                success(res) {
                  console.log(res.authSetting)
                }
              })                   
              console.log('用户点击授权')   
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }

         });
        
         }
       })
       }
     }
   })
  },
  onSubmitEvent:function(event){
    const that=this;
    const content=event.detail.value.content;
    const location = that.data.location;
    const author = app.globalData.userInfo;
    const tempVideo = that.data.tempVideo;
    const systemInfo=wx.getSystemInfoSync();
    let model=systemInfo.model;
    const device=model.replace(/<.*>/,'');
    const weibo={
      content:content,
      location:location,
      author:author,
      tempVideo: tempVideo,
      device: device
    }
    wx.showLoading({
      title: '正在发表...',
    })
    //上传图片到云服务器
    const fileIDList=[];
   
    if(that.data.tempImages.length > 0 ){
     
      that.data.tempImages.forEach((value,index)=>{

        const cloudPath=that.getCloudPath(value);
     
         wx.cloud.uploadFile({
           filePath:value,
           cloudPath:cloudPath,
           success:res=>{
            fileIDList.push(res.fileID);
            if(fileIDList.length == that.data.tempImages.length){
              //发微博
            weibo.images=fileIDList;
            that.czshujuku(weibo);

            }

           }
         })
      });
    }else if(that.data.tempVideo){
     
      const cloudPath = that.getCloudPath(that.data.tempVideo);
    
      wx.cloud.uploadFile({
        filePath: that.data.tempVideo,
        cloudPath: cloudPath,
        success: res => {
        const fileID=res.fileID;
          weibo.video = fileID;
          that.czshujuku(weibo);

        }
      });

    }else{
      that.czshujuku(weibo);
    }
  
   


    
  },
//操作数据库
czshujuku:function(weibo){
  wx.cloud.callFunction({
    name:"wweibo",
    data:{
      content:weibo.content
    }, 
    success:res=>{    
     const result=res.result;
     if(result){
   db.collection('weibo').add({
       data:{
         content: result,
         location:weibo.location,
         author: weibo.author,
         images: weibo.images,
         video: weibo.video,
         create_time:db.serverDate(),
         device:weibo.device
       }
     });
   wx.showToast({
     title: '发布成功',
   });
  setTimeout(()=>{
    wx.navigateBack({});
  },1500);
     }else{
       wx.showToast({
         title: '内容有敏感词！',
       });      
       console.log('您输入的内容有敏感词！')
     }
    }
  })
},


  onAddImagesTap:function(){
    const that=this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        const tempFilePaths=res.tempFilePaths;
        const oldtempImages=that.data.tempImages;
        const newtempImages=oldtempImages.concat(tempFilePaths);
        // console.log(tempFilePaths);
      that.setData({
        tempImages:newtempImages
      })
      },
     
    })


  },
  onRmoveBtnTap:function(event){
  
     const index=event.target.dataset.index;
    const tempImages=this.data.tempImages;
    tempImages.splice(index,1);
    this.setData({
      tempImages:tempImages
    })
  },
  //定义一个获取上传到云端的文件的名称
  getCloudPath:function(fileName){
    const today = new Date();
    const year = today.getFullYear();
    const mouth = today.getMonth() + 1;
    const day = today.getDate();
   
    const cloudPath = 'weibo/' + year + "/" + mouth + "/" + day + "/" + getUUID() + "." + getExt(fileName);
    return cloudPath;
  },
  // 预览图片
  onImagesTap:function(event){
    const that =this;
    const current=event.target.dataset.index;

     wx.previewImage({
       urls: that.data.tempImages,
       current:current
     })
  }
  
})