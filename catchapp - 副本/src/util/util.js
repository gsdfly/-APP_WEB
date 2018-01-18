
import CONFIG from './../config/index'

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

export const callAppFunction = (func,args,callback) => {
  args = args || {};
  //判断手机系统
  var argsString = JSON.stringify(args);
  if(CONFIG.PhoneType == 'isAndroid'){
    var result;
    if(argsString == '{}'){
       result = eval("DianaJSInterface." + func + "();");
    }else {
      result = eval("DianaJSInterface." + func + "('" + argsString + "');");
    }
    if (callback){
      callback(result);
    }
  }
  else if(CONFIG.PhoneType == 'isIOS'){
    setupWebViewJavascriptBridge(function(bridge) {
     // js回调 (oc向js发送消息(data) , js返回信息(responseData))
      if(func == "setJSCallback"){
        for (var eventName in args) {
               (function (eventName) {
                 bridge.registerHandler(args[eventName], function (data, responseCallback) {
                   var appDataStr = JSON.stringify(data);
                   eval(args[eventName] + "('" + appDataStr + "');");
                 });
               })(eventName);
             }
      }else{
        //js调用原生
        bridge.callHandler(func,argsString,callback);
      }
    })
  }else{
    return false;
  }
}




