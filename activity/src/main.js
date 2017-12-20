import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import callbackUrl from './callbackUrl'
import wxFc from './config/wx'
import CONFIG from './config/index'
import router from './router'

!function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
      if (clientWidth >= 640) {
        docEl.style.fontSize = '100px'
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}(document, window)

FastClick.attach(document.body)

!async function () {
  var sc = document.createElement('script')

  if (process.env.NODE_ENV !== 'development') {
    //回调授权
    await callbackUrl()
    //配置初始化
    if(CONFIG.isWx){
      sc.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js'
      document.getElementsByTagName('body')[0].appendChild(sc)
      sc.onload = function() {
        wxFc()
      }
    }else{
      sc.src = 'https://a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.5/alipayjsapi.inc.min.js'
      document.getElementsByTagName('body')[0].appendChild(sc)
    }
  }

  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
}()

