import { globalurls } from "urls.js"
const network = {
  //得到电影数据
  getMovieList: function (params) {
    params.type = 'movie';
    this.getItemList(params);
  },
  //得到电视剧数据
  getTVList: function (params) {
    params.type = 'tv';
    this.getItemList(params);
  },
  //得到综艺数据
  getShowList: function (params) {
   params.type='show';
   this.getItemList(params);
  },
  //得到数据的方法
  getItemList: function (params){
    var url='';
    if (params.type==='movie'){
        url=globalurls.movieList;
    } else if (params.type === 'tv'){
      url = globalurls.tvList;
    }else{
      url = globalurls.showList;
    }
    var count = params.count ? params.count : 7;
    wx.request({
      url: url,
      data: {
        count: count
      },
      success: function (res) {
        var items = res.data.subject_collection_items;
        var itemsCount=items.length;
        var left = itemsCount%3;
        if(left===2){
      items.push(null);
        } 
        if (params && params.success) {
          params.success(items);
        }

      }

    });

  },

//得到detail的数据
getItemDetail:function(params){
var type=params.type;
var id =params.id;
var url='';
if(type==='movie'){
url=globalurls.movieDetail+id;
}else if(type==='tv'){
  url = globalurls.tvDetail + id;
}else{
  url = globalurls.showDetail + id;
}
wx.request({
  url: url,
  success:function(res){
    var item=res.data;
    if(params.success){
      params.success(item);
    }
  }
})


},
//得到标签
  getItemTages: function (params){
    var type=params.type;
    var id=params.id;
    var url="";
    if(type==='movie'){
      url = globalurls.movieTages(id);
    }else if(type==='tv'){
      url = globalurls.tvTages(id);
    }else{
     url=globalurls.showTages(id);
    }

    wx.request({
      url: url,
      success:function(res){
      var tags=res.data.tags;
     if(params.success){
       params.success(tags);
     }
      }
    });

},
//得到评论
  getItemComments: function (params){
  var   type=params.type;
  var   id=params.id;
    var start = params.start ? params.start : 0;
    var count = params.count ? params.count : 3;
    var url="";
    if(type==='movie'){
      url = globalurls.movieComments(id,start,count);
    }else if(type==='tv'){
      url = globalurls.tvComments(id, start, count);
    }else{
      url = globalurls.showComments(id, start, count);
    }
    wx.request({
      url: url,  
      success:function(res){
         var data=res.data;
         if(params.success){
           params.success(data);
         }
      }
    });

  },
  //得到搜索内容发送网络请求
  getSearch: function (params){
      var q=params.q;
     
    var url = globalurls.searchurl(q);
   
    wx.request({
      url: url,
      success:function(res){
       var subjects=res.data.subjects;
        
       if(params.success){
         params.success(subjects);
       }
      }
    });

  }
}
export { network }
