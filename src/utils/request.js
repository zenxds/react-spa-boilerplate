import { message } from '@dx/xbee'
import axios from 'axios'
import { param, isPlainObject } from './lang'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

export default function request(config = {}) {
  config = Object.assign(
    {
      // catchError为自定义配置，是否捕获错误
      catchError: true,
      withCredentials: true,
      timeout: 30 * 1000,
    },
    config,
  )

  const ret = axios(config).then(response => {
    const { success, data, message } = response.data || {}

    if (success) {
      return data
    } else {
      throw new Error(message || '请求失败')
    }
  })

  if (config.catchError) {
    return ret.catch(err => {
      message.error(err.message)
    })
  }

  return ret
}

// https://github.com/axios/axios/blob/master/lib/core/Axios.js
export function get(url, params = {}, config = {}) {
  return request(
    Object.assign(config, {
      method: 'get',
      url,
      params,
    }),
  )
}

export function post(url, data, config = {}) {
  if (isPlainObject(data)) {
    data = param(data)
  }

  return request(
    Object.assign(config, {
      method: 'post',
      url,
      data,
    }),
  )
}

export function jsonPost(url, data = {}, config = {}) {
  return request(
    Object.assign(config, {
      method: 'post',
      url,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }),
  )
}
