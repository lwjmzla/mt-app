function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// ! 打乱数组
export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// ! 动态加载css文件
export function loadCss (_href) {
  var oLink = document.createElement('link')
  oLink.type = 'text/css'
  oLink.rel = 'stylesheet'
  oLink.href = _href
  if (document.head) {
    document.head.appendChild(oLink)
  } else {
    document.getElementsByTagName('head')[0].appendChild(oLink)
  }
  return oLink
}

export function IsCorrectMobile (mobile) {
  var reg = new RegExp(/^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|19[0-9]|166)[0-9]{8}$/)
  return reg.test(trim(mobile))
}
// !6-16位，包含数字和字母
export function IsCorrectPwd (pwd) {
  var reg = new RegExp(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/)
  return reg.test(pwd)
}

export function IsCorrectEmail (email) {
  // var reg = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/)
  // eslint-disable-next-line
  var reg = new RegExp("^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-||_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+([a-z]+|\\d|-|\\.{0,1}|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])?([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))$")
  // var reg = new RegExp(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)
  return reg.test(trim(email))
}

// 清除前后空格
export function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 判断正整数
export function IsPosInteNum (num) {
  var reg = new RegExp(/^\+?[1-9][0-9]*$/)
  return reg.test(num)
}

// 获取url后面的参数
export const getUrlParams = () => {
  let args = {}
  let argsStr = decodeURI(decodeURI(location.search))
  if (argsStr.length > 0) {
    argsStr = argsStr.substring(1)
    let nameValueArr = argsStr.split('&')
    for (let i = 0; i < nameValueArr.length; i++) {
      let pos = nameValueArr[i].indexOf('=')
      if (pos === -1) continue
      let argName = nameValueArr[i].substring(0, pos)
      let argVal = nameValueArr[i].substring(pos + 1)
      args[argName] = unescape(argVal)
    }
  }
  return args
}

// 添加或编辑Url里的参数
export const updateUrlParam = (url, key, value) => {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  var separator = url.indexOf('?') !== -1 ? '&' : '?'
  if (url.match(re)) {
    return url.replace(re, (value ? ('$1' + key + '=' + value) : '') + '$2')
  } else {
    return url + (value ? (separator + key + '=' + value) : '')
  }
}
// 页码跳转
export const goPage = (num) => {
  const url = window.location.href
  let newUrl = updateUrlParam(url, 'page', num)
  window.location.href = newUrl
}

export const storage = {
  // 存储
  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  get (key) {
    return JSON.parse(localStorage.getItem(key)) || {}
  },
  // 删除数据
  remove (key) {
    localStorage.removeItem(key)
  }
}

export const session = {
  // 存储
  set (key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  // 取出数据
  get (key) {
    return JSON.parse(sessionStorage.getItem(key)) || '{}'
  },
  // 删除数据
  remove (key) {
    sessionStorage.removeItem(key)
  }
}

// 拷贝继承
export function extend (_preJson, _addJson) {
  for (var key in _addJson) {
    _preJson[key] = _addJson[key]
  }
  return _preJson
}
