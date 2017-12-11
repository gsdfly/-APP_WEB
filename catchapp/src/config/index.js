
function getPhoneType() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isAndroid){
    return 'isAndroid';
  }
  if(isIOS){
    return 'isIOS';
  }
}

let CONFIG = {
  url: process.env.NODE_ENV == 'development' ? 'http://proxy.5zhua.cn/' :'http://yapi.5zhua.cn/mock/18',
  token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcHJveHkuNXpodWEuY24vYXBpL3VzZXJfbG9naW4iLCJpYXQiOjE1MTI1NTYwMzAsImV4cCI6MTUxNzczNDAzMCwibmJmIjoxNTEyNTU2MDMwLCJqdGkiOiJPUHFGWUFXRmQ2Rk96Qk5nIiwic3ViIjo0ODcsInBydiI6IjM3YjdjNTBiMjUwNDFhNGMyMGZlNDdjMjQyZTFiZmQwZjYzMDkyYzUifQ.TKdXLeRBnyCQwrORMyNYm8BH7Jaistp3IlAa42AV9dY',
  PhoneType:getPhoneType()
}


export default CONFIG
