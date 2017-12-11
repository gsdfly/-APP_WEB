import axios from 'axios'
import CONFIG from './index'
import { MessageBox } from 'mint-ui';

let instance = axios.create({
  baseURL: 'http://proxy.5zhua.cn/api/',
  headers: {'Authorization': `Bearer ${CONFIG.token}`},
})

instance.interceptors.response.use(function(response) {
  // 错误码信息
  let res = response.data

  if (res.status_code != 200) {
    // MessageBox('提示','网络出错,请稍后重试')
  }
  return res

},
  function(error) {
  // Do something with response error
  console.log(error, '全局err')
  return error;
})


// function getErrMsg(errCode, msg) {
//   let m = ''
//   if (errCode) {
//     switch(errCode) {
//       case 1008:
//         m = '设备游戏中'
//         break;
//       default:
//         m = '网络出错,请重新扫描二维码'
//         break
//     }
//   }
//   return m
// }


export {
  instance
}

