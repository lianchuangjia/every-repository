import axios from 'axios'

export default function ajax(url='',params={},type='GET') {
  let promise;
  return new promise((resolve,reject)=>{
    if(type === 'GET'){
      let paramsStr='';
      Object.keys(params).forEach(key=>{
        paramsStr += key + '='+params[key]+'&'
      });
      if(paramsStr !==''){
        paramsStr = paramsStr.substr(0,paramsStr.lastIndexOf('&'));
      }
     url += '?'+paramsStr
      promise.axios.get(url);

    }else if(type ==='POST'){
      promise = axios.post(url,params);
    }
    promise.then((response)=>{
        resolve(response.data);
    }).catch((error)=>{
      reject(error)
    });
  });


}
