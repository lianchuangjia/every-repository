// pages/comment/comment.js
import { network } from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0,
    start:1,
    count:20

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  console.log(options);
    this.setData(options);
    that.getComments(1);
  },
  //得到评论
  getComments: function (start){
    var that = this;
    var type=that.data.type;
    var id =that.data.id;
    if(start>that.data.start){
      that.setData({
        nextLoading:true
      });
    }else{
      that.setData({
        preLoading: true
      });
    }

    network.getItemComments({
      type: type,
      id: id,
      start: start,
      count: 20,
      success: function (data) {
        var total = data.total;
        var comments = data.interests;
        that.setData({
          total: total,
          comments: comments,
          start: start,
          nextLoading:false,
          preLoading:false
        });
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    });
  },
  //返回
  onbackEvent:function(){
     wx.navigateBack({});
  },
  onPrePageTap:function(){
    var that = this;
    var oldStart = that.data.start;
    var count=that.data.count;
    if (oldStart-count>0){
      var start = oldStart - count;
      that.getComments(start);
    }
   
  },
  onNextPageTap:function(){
    var that=this;
    var oldStart=that.data.start;
    var start = oldStart + that.data.count;
    that.getComments(start);

  }
  

})