import CONFIG from './index'
import router from '../router'
import {getWxJssdk} from "../api/index";

const updateToken = () => {
    return new Promise((success, error) => {
        instance.put('auth/refresh')
            .then((data) => {
                CONFIG.token = data.token
                success()
            })
    })
}

const getJssdk = () => {
    return new Promise(async (success, error) => {
     let data = await getWxJssdk({
         url: document.URL.split('#')[0]
     });
     console.log(data);
      if(data.status_code==200){
        success(data.data)
      }else {
        router.replace('/404')
      }
    })
}

//  wx config
const wxConfig = (r) => {
    console.log('wx config')
    wx.config({
        debug: false,
        appId: r.appId,
        timestamp: r.timestamp,
        nonceStr: r.nonceStr,
        signature: r.signature,
        url: r.url,
        jsApiList: [
            'onMenuShareTimeline',     // 分享朋友圈
            'onMenuShareAppMessage',   // 分享朋友
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'chooseWXPay',
            'scanQRCode'
        ]
    })
}

//  wx ready
const wxReady = () => {
    console.log('wx ready')
    wx.ready(() => {
        wx.showOptionMenu()
        // wx.showMenuItems({
        //     menuList: [
        //         'menuItem:refresh',//刷新
        //         'menuItem:profile',//查看公众号（已添加）
        //         'menuItem:addContact',//查看公众号（未添加）
        //         'menuItem:share:appMessage',//发送给朋友
        //         'menuItem:share:timeline',//分享到朋友圈
        //         'menuItem:copyUrl'//复制链接
        //     ]
        // })
        // wx.hideMenuItems({
        //     menuList: [
        //         "menuItem:share:qq",
        //         "menuItem:share:QZone",
        //         "menuItem:share:email",
        //         "menuItem:openWithSafari"
        //     ]
        // })

        //分享到朋友圈
        //wx.onMenuShareTimeline(shareObj)
        //分享给朋友
        //wx.onMenuShareAppMessage(shareObj)
    })
}

const wxError = () => {
    wx.error((res) => {
        console.error(JSON.stringify(res))
        console.error('wx error')
    })
}


const wxFc = () => {
return getJssdk()
        .then(r => {
            wxConfig(r)
            wxReady()
            wxError()
        })
        .catch(err => {
            console.log(err)
        })
}

export default wxFc
