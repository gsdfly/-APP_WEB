import fetch from './../config/fetch'

export const getWxJssdk = (params) => fetch('api/wechat/jssdk',params)

