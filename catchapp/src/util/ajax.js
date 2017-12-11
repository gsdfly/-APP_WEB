import {instance} from './../config/common.js'

export const getAddressList = () => {
  return new Promise((success, error) => {
    instance.get('address').then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const deleteAddress = (params) => {
  return new Promise((success, error) => {
    instance.post('address/delete',params).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const setAddressDefault = (params) => {
  return new Promise((success, error) => {
    instance.post('address/setDefault',params).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const createAddress = (params) => {
  return new Promise((success, error) => {
    instance.post('address/create',params).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

export const updateAddress = (params) => {
  return new Promise((success, error) => {
    instance.post('address/update',params).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

//获取默认地址
export const getAddressDefault = () => {
  return new Promise((success, error) => {
    instance.get('address/default').then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

//获取娃娃列表
export const getDollList = (params) => {
  return new Promise((success, error) => {
    instance.get('doll',{params:params}).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}

//娃娃兑换订单列表
export const getDollOrderList = () => {
  return new Promise((success, error) => {
    instance.get('doll/exorders').then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}
//获取一个兑换订单详情
export const getDollOrder = (params) => {
  return new Promise((success, error) => {
    instance.get('doll/exorder',{params:params}).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}
//娃娃兑换
export const exchangeDolls = (params) => {
  return new Promise((success, error) => {
    instance.post('doll/exorder/create',params).then((data) => {
      success(data)
    }).catch((err) => {
      error(err)
    })
  })
}



