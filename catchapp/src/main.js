// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import router from './router'
import 'mint-ui/lib/style.css'
import Indicator from 'mint-ui/lib/indicator'
import FastClick from 'fastclick'
import {callAppFunction} from './util/util.js'
import CONFIG from './config/index'

!function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) return
        docEl.style.fontSize = 100 * (clientWidth / 1080) + 'px'
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}(document, window)

FastClick.attach(document.body);

Vue.use(Vant);

Vue.config.productionTip = false

!function () {
  Vue.prototype.Indicator = Indicator
  Vue.prototype.callAppFunction=callAppFunction

  callAppFunction('getUserInfo','',function (res) {
    if(typeof res == 'string'){
      res = JSON.parse(res);
    }
    CONFIG.token = res.catch_token;
  });

  new Vue({
    el: '#app',
    template: '<App/>',
    router,
    components: { App }
  })
}
()



