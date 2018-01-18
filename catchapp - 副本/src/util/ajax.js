import {instance} from './../config/common.js'
import CONFIG from './../config/index'

export const getAddressList = () => {
  return new Promise((success, error) => {
    instance.get('address',{params:{app_key:CONFIG.appKey}}).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const deleteAddress = (params) => {
  return new Promise((success, error) => {
    instance.post('address/delete',Object.assign({},{app_key:CONFIG.appKey},params)).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const setAddressDefault = (params) => {
  return new Promise((success, error) => {
    instance.post('address/setDefault',Object.assign({},{app_key:CONFIG.appKey},params)).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const createAddress = (params) => {
  return new Promise((success, error) => {
    instance.post('address/create',Object.assign({},{app_key:CONFIG.appKey},params)).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const updateAddress = (params) => {
  return new Promise((success, error) => {
    instance.post('address/update',Object.assign({},{app_key:CONFIG.appKey},params)).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

//获取默认地址
export const getAddressDefault = () => {
  return new Promise((success, error) => {
    instance.get('address/default',{params:{app_key:CONFIG.appKey}}).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

//获取娃娃列表
export const getDollList = (params) => {
  return new Promise((success, error) => {
    instance.get('doll',{params:Object.assign({},{app_key:CONFIG.appKey},params)}).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

//娃娃兑换订单列表
export const getDollOrderList = () => {
  return new Promise((success, error) => {
    instance.get('doll/exorders',{params:{app_key:CONFIG.appKey}}).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}
//获取一个兑换订单详情
export const getDollOrder = (params) => {
  return new Promise((success, error) => {
    instance.get('doll/exorder',{params:Object.assign({},{app_key:CONFIG.appKey},params)}).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}
//娃娃兑换
export const exchangeDolls = (params) => {
  return new Promise((success, error) => {
    instance.post('doll/exorder/create',Object.assign({},{app_key:CONFIG.appKey},params)).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}



