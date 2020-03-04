// pages/detail/detail.js
import { network} from "../../utils/network.js"
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
    var that =this;
    var type=options.type;
    var id= options.id;
  that.setData({
      id:id,
      type:type
  });

    network.getItemDetail({
      type:type,
      id:id,
//回调函数
      success:function(item){     
   //得到类型
       var  genres=item.genres;
       genres=genres.join("/");
       item.genres = genres;
  //得到导演+演员
      var actors=item.actors;
      var actorsName=[];
      if(actors.length > 3){
        actors=actors.slice(0,3);    
      } 
      for (var index = 0; index < actors.length;index++){
        var actor = actors[index];
        actorsName.push(actor.name);
      }  
      actorsName = actorsName.join("/");
      //director导演，authors全部
        var director = item.directors[0];
        if (director){
          var director = item.directors[0].name;
        }else{
          var director='***';
        }
      var authors = director + "(导演)/" + actorsName;         item.authors = authors;

        // console.log(item);
        that.setData({
          item: item
        });
      }
    });

    //调用标签Tages
    network.getItemTages({
      type:type,
      id:id,
      success:function(tags){
         that.setData({
           tags: tags
         });
      }


     });
     //获取评论
     network.getItemComments({
       type:type,
       id:id,
       success:function(data){
         var totalComment=data.total;
         var comments = data.interests;
         that.setData({
           totalComment: totalComment,
           comments: comments
         });
        
       }

     });
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //刷新就滚动到头部
      wx.pageScrollTo({
        scrollTop: 0,
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})