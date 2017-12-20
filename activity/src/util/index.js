export const getParamByName = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2]);
    return null
}

export const GetCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
    } else {
        return null
    }
}

export const SetCookie = (name, value) => {
    var Days = 30
    var exp = new Date()
    exp.setTime(exp.getTime() + 60 * 60 * 1000)//过期时间 2分钟
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}

//测试淘票票生成唯一id
export const generateUUID = () =>{
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}
//根据场地的id得到要去的组件名称
export const  getComponent = (place) => {
  let m = ''
  console.log(typeof place);
  if (place) {
    switch(place) {
      case '1001':
        m = 'place1'
        break;
      default:
        m = 'place2'
        break
    }
  }
  return m
}




