
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
  // token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NhdGNoX3Byb3h5LmRldiIsImlhdCI6MTUxNjk0OTE4NywiZXhwIjoxNTIyMTI3MTg3LCJuYmYiOjE1MTY5NDkxODcsImp0aSI6IkljR1ExYzBmckFzMGNUMkYiLCJzdWIiOjUzNCwicHJ2IjoiMzdiN2M1MGIyNTA0MWE0YzIwZmU0N2MyNDJlMWJmZDBmNjMwOTJjNSJ9.mkzqjZX6cm_sYgw7WngK7o0I_LYdbX-g2ByCaNl4YyQ',
  token:'',
  PhoneType:getPhoneType(),
  // appKey:'kyx+kydm6A1nXQCnfi+PWusy/8We5HYh5QFlqVIUVfk='
  appKey:''
}


export default CONFIG
