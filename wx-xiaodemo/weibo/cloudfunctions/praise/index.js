// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _=db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openId = wxContext.OPENID;
  const weiboId = event.weiboId;
  const is_not_pr = event.is_not_pr;
  // console.log(weiboId);
  if (is_not_pr){
    return await db.collection('weibo').doc(weiboId).update({
      data: {
        "praises": _.push(openId)
      }
    })
  }else{
    //获得微博中的praises数组
    const weiboRes=await db.collection('weibo').doc(weiboId).field({
      praises:true
    }).get()
    const praises = weiboRes.data.praises;
    //数组中openId删除
    const newPraises=[];
    praises.forEach((praise,index)=>{
      if (praise != openId){
        newPraises.push(praise)
      }
    })
    //重新设置
    return await db.collection('weibo').doc(weiboId).update({
      data:{
        praises:newPraises
      }
    })

  }



 
}