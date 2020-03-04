// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
 
  const start=event.start;
  let pp = db.collection("weibo");
  if (start > 0) {
    pp = pp.skip(start);
  }
 const weiboRes=await pp.limit(10).orderBy("create_time", "desc").get()
  const weibos = weiboRes.data;
  if(weibos.length>0){
    weibos.forEach((weibo, index) => {
      weibo.isPraised = false;
      if (weibo.praises && weibo.praises.length>0) {
       weibo.praises.forEach((praise,index)=>{
         if(praise == openid){
           weibo.isPraised=true;
         }
       })
      }
  })


}
  return {
    weibos: weibos
  }
}