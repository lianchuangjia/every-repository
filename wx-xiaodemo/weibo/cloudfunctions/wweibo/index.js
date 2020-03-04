// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require("got")
cloud.init()
 const db=cloud.database();


const APPID ="wx6aa3e23bc839cfb2"
const AppSECRET ="f1d6556381599751c09e48fc30515704"


const TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + AppSECRET
const CHECK_URL ="https://api.weixin.qq.com/wxa/msg_sec_check?access_token="

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const content=event.content;
  // // const location=event.location;

  // const tokenResp= await got(TOKEN_URL);
  // const tokenBody=JSON.parse(tokenResp.body);
  // const token=tokenBody.access_token;

  // const checkResp= await got(CHECK_URL+token,{
  //   body:JSON.stringify({
  //     content: content
  //   })
  // });
 
  // const checkBody=JSON.parse(checkResp.body);
  // console.log(checkBody);
  //  return checkBody

  try {
    const checkmsg = await cloud.openapi.security.msgSecCheck({
      content: event.content,
      // location: event.location,
      // author: event.author
    });
    // console.log(checkmsg) 
    const errCode=checkmsg.errCode;
    if(errCode==0){
    // await db.collection('weibo').add({
    //     data:{
    //       content: content
    //       // location:location,
    //       // author: author
    //     }
    //   })
     
      console.log("111");    
     
    }else{
      console.log("222"); 
    }
    return content;
  } catch (err) {
    console.log("失败") 
  }
 

}