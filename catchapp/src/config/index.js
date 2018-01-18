
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
  pageUrl:document.URL.indexOf('catchme') != -1 ? 'http://www.catchme.com.cn/':'http://www.5zhua.cn/',
  url: document.URL.indexOf('catchme') != -1 ?  'http://proxy.catchme.com.cn/' : 'http://proxy.5zhua.cn/',
  // token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcHJveHkuNXpodWEuY24vYXBpL3VzZXJfbG9naW4iLCJpYXQiOjE1MTI1NTYwMzAsImV4cCI6MTUxNzczNDAzMCwibmJmIjoxNTEyNTU2MDMwLCJqdGkiOiJPUHFGWUFXRmQ2Rk96Qk5nIiwic3ViIjo0ODcsInBydiI6IjM3YjdjNTBiMjUwNDFhNGMyMGZlNDdjMjQyZTFiZmQwZjYzMDkyYzUifQ.TKdXLeRBnyCQwrORMyNYm8BH7Jaistp3IlAa42AV9dY',
  // token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcHJveHkuNXpodWEuY24iLCJpYXQiOjE1MTU2NjExMjksImV4cCI6MTUyMDgzOTEyOSwibmJmIjoxNTE1NjYxMTI5LCJqdGkiOiJmdTh4YTcwaTFUWFdKblczIiwic3ViIjo1MjksInBydiI6IjM3YjdjNTBiMjUwNDFhNGMyMGZlNDdjMjQyZTFiZmQwZjYzMDkyYzUifQ.MeJIAl0c2mBkJAYRkTB9IKgjTAd046R5jKiLIwsMGMQ',
  token:'',
  PhoneType:getPhoneType(),
  // appKey:'kyx+kydm6A1nXQCnfi+PWusy/8We5HYh5QFlqVIUVfk='
  appKey:''
}


export default CONFIG
