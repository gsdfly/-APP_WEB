import {getParamByName, GetCookie} from '../util'

function IsWeixinOrAlipay() {
  var ua = window.navigator.userAgent.toLowerCase()
  //判断是不是微信
  if (ua.match(/MicroMessenger/i) == 'micromessenger') return "WeiXin"
  //判断是不是支付宝
  if (ua.match(/AlipayClient/i) == 'alipayclient') return "Alipay"
  //判断是不是淘票票
  if (ua.match(/tbmovie/i) == 'tbmovie') return "Tpp"
  //哪个都不是
  return "false"
}

let CONFIG = {
  url: document.URL.indexOf('catchme') != -1 ? 'http://front.catchme.com.cn/':'http://front.5zhua.cn/',
  version: '1.0.0',
  // token: getParamByName('token') || GetCookie('token_'),
  token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZnJvbnQuNXpodWEuY24vd2VjaGF0L29hdXRoIiwiaWF0IjoxNTEzNzM1NDg3LCJleHAiOjE1MTM3NDI2ODcsIm5iZiI6MTUxMzczNTQ4NywianRpIjoiUVRKN1VEN2Y3SW9zRFNqdCIsInN1YiI6MTN9.eANCMEowZQeZXOM2dCO6lh7jSUbTc4J8U5AbLusXuoU',
  place: getParamByName('place'),
  isWx: IsWeixinOrAlipay() === 'WeiXin' ? true : false,
  isAlipay: IsWeixinOrAlipay() === 'Alipay' ? true : false,
  isTpp: IsWeixinOrAlipay() === 'Tpp' ? true : false
}

export default CONFIG
