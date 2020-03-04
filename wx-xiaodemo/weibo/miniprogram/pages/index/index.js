const app= getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[1,2,3,4,5,6,7,8,9],
    hasmore:true,
    weibos:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ImageSize();
    this.loadweibos();
  },
  onShow:function(event){
    this.loadweibos();
  },
  onReachBottom:function(event){
     this.loadweibos(this.data.weibos.length);
  },
  onPullDownRefresh:function(event){
     this.loadweibos();
  },
  //得到数据
  loadweibos: function (start=0){
    const that=this;
   wx.cloud.callFunction({
     name:"weibos",
     data:{
       start:start
     }
   }).then(res=>{
    //  console.log('------')
    //  console.log(res)
    //  console.log('------')
      const webs=res.result.weibos;
    // console.log(webs);
      let hasmore=true;
     if (webs.length==0){
         hasmore = false;
      }
      let newweibos=[];
      if(start > 0){
        newweibos = that.data.weibos.concat(webs);
      }else{
        newweibos= webs;
      }
    
        // const newweibos = that.data.weibos.concat(weibos);
      that.setData({
        weibos: newweibos,
        hasmore: hasmore
      })
      
    })

  },
  // 预览图片
  onImagesTap: function (event) {  
    //weibotupIndex得到第几个微博的index，imageIndex得到微博中图片组中的index
    const weibotupIndex = event.target.dataset.weibotup;
    const imageIndex = event.target.dataset.index;
    //images得到第几个微博的图片组，current得到图片组中图片的index
    const images = this.data.weibos[weibotupIndex].images;
    const current = images[imageIndex];
    // console.log(images);
    // console.log(current);
    wx.previewImage({
      urls: images,
      current: current
    })
  },

   ImageSize:function(){
     const windowWidth=wx.getSystemInfoSync().windowWidth;
    const weiboWidth=windowWidth-40;
    const twoImageSize=(weiboWidth-2.5)/2;
    const threeImageSize=(weiboWidth-2.5*2)/3;
   this.setData({
    twoImageSize:twoImageSize,
    threeImageSize:threeImageSize
   });



   },
   onWriteWeiboTap:function(event){
   const that=this;
    if(app.is_login()){     
      wx.showActionSheet({
        itemList: ['文字', '图片', '视频'],
        success (res) {      
          const type=res.tapIndex;
          if(type==0){
            wx.navigateTo({
              url: '../writeweibo/writeweibo?type='+type,          
            });
          } else if(type==1){
            wx.chooseImage({
              sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
              sourceType: ['album'], // album 从相册选图，camera 使用相机，默认二者都有
              success: function(res){
              const tempImages=res.tempFilePaths;  
              that.setData({
                tempImages:tempImages
              }); 
              wx.navigateTo({
                url: '../writeweibo/writeweibo?type='+type,          
              });
              
              }             
            });
            
          } else if (type == 2){
             wx.chooseVideo({
               success:res=>{
                //  console.log(res);
                 const tempVideo=res.tempFilePath;
                 that.setData({
                   tempVideo: tempVideo
                 });
                 wx.navigateTo({
                   url: '../writeweibo/writeweibo?type=' + type,
                 });
               }
             });
          }
         
        }
       
      })     
    }else{
     wx.navigateTo({
       url: '../login/login',
      
     });
    }


   },
  //点赞
  onPraiseTap:function(event){
    const that=this;
    const weiboindex=event.currentTarget.dataset.weibo;
    const weibo=that.data.weibos[weiboindex];
    //  console.log(weibo);
    // console.log(weibo._id);
    const openId = app.globalData.userInfo.userId;
  
    if (!weibo.isPraised){
      wx.cloud.callFunction({
        name: 'praise',
        data: {
          is_not_pr:true,
          weiboId: weibo._id
        },
        success: res => {
          // console.log(res);
          // console.log("没有");
          if (!weibo.praises) {
             weibo.praises=[openId];

          }else{
            weibo.praises.push(openId);
          }
          weibo.isPraised=true;
          const weibos=that.data.weibos;
          weibos[weiboindex]=weibo;
          that.setData({
            weibos:weibos
          })

        }
      })
    }else{
      wx.cloud.callFunction({
        name:"praise",
        data:{         
          is_not_pr: false,
          weiboId: weibo._id
        }
      }).then(res=>{
        // console.log('00000')
        // console.log(res)
        const newPraises = [];
       weibo.praises.forEach((praise, index) => {
          if (praise != openId) {
            newPraises.push(praise)
          }
        })
        weibo.praises=newPraises;
        weibo.isPraised=false;
        const weibos = that.data.weibos;
        weibos[weiboindex] = weibo;
        that.setData({
          weibos: weibos
        })


      })

    }

    


    
  },
  onpl:function(event){
    // console.log(event)
    const weibo = event.currentTarget.dataset.weibo;
    let weibojson=JSON.stringify(weibo);
    //  console.log(weibo)
    wx.navigateTo({
      url: '../pl/pl?weibo=' + weibojson,
    })
   
  }
 
})