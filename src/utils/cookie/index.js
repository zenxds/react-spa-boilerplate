/**
 * cookie module
 * export get/set/remove
 */
const MILLISECONDS_OF_DAY = 24 * 60 * 60 * 1000
const encode = encodeURIComponent
const decode = val => {
  return decodeURIComponent((val + '').replace(/\+/g, ' '))
}
const isNotEmptyString = val => {
  return typeof val === 'string' && val !== ''
}

/**
 * 获取 cookie 值
 * @return {string} 如果 name 不存在，返回 undefined
 */
export const get = name => {
  let ret

  if (isNotEmptyString(name)) {
    const match = String(document.cookie).match(
      new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')
    )

    if (match) {
      ret = match[1] ? decode(match[1]) : ''
    }
  }

  return ret
}

/**
 *
 * @param {*} name
 * @param {*} val
 * @param {*} domain
 * @param {Number/Date} expires
 * @param {*} path
 * @param {*} secure
 */
export const set = (name, val, options = {}) => {
  let text = String(encode(val))
  let date = options.expires

  // 从当前时间开始，多少天后过期
  if (typeof date === 'number') {
    date = new Date()
    date.setTime(date.getTime() + options.expires * MILLISECONDS_OF_DAY)
  }

  // expiration date
  if (date instanceof Date) {
    text += '; expires=' + date.toUTCString()
  }

  // domain
  if (isNotEmptyString(options.domain)) {
    text += '; domain=' + options.domain
  }

  // path
  if (isNotEmptyString(options.path)) {
    text += '; path=' + options.path
  }

  // samesite
  // strict/lax/none
  if (isNotEmptyString(options.samesite)) {
    text += '; samesite=' + options.samesite
  }

  // secure
  if (options.secure) {
    text += '; secure'
  }

  document.cookie = name + '=' + text
}

export const remove = (name, options = {}) => {
  // 置空，并立刻过期domain, path, secure
  set(name, '', {
    expires: -1,
    domain: options.domain,
    path: options.path
  })
}
