import { message } from '@dx/xbee'
import axios from 'axios'

import { API_SERVER, AUTH_KEY, API_USER_INFO } from '@constants'
import { compact } from './lang'
// import * as cookie from './cookie'

axios.defaults.baseURL = API_SERVER

const messageMap = {
  'request error': '请求失败，请稍后重试',
  'Network Error': '网络出错，请检查您的网络状况',
  'Request failed with status code 502': '服务器出小差了，请稍后重试',
}
const loginIgnoreList = [API_USER_INFO]


axios.interceptors.request.use(function(config) {
  const headers = config.headers || {}

  // headers['X-CSRFToken'] = cookie.get('csrftoken')
  const token = localStorage.getItem(AUTH_KEY) || ''
  if (token) {
    headers['Authorization'] = 'Token ' + localStorage.getItem(AUTH_KEY) || ''
  }

  return config
})

export default function request(config = {}) {
  config = Object.assign(
    {
      // catchError为自定义配置，是否捕获错误
      catchError: true,
      // 是否返回整个response data，默认返回接口里的data字段
      returnResponseData: false,
      // withCredentials: true,
      timeout: 30 * 1000,
    },
    config,
  )

  const ret = axios(config).then(response => {
    if (config.method.toLowerCase() === 'delete') {
      return true
    }

    const { success, data, message } = response.data

    if (success) {
      return config.returnResponseData ? response.data : data
    } else {
      throw new Error(message || '请求失败')
    }
  })

  if (config.catchError) {
    return ret.catch(err => {
      const msg = err?.response?.data.message || err.message

      if (loginIgnoreList.indexOf(config.url) === -1) {
        message.error(messageMap[msg] || msg)
      }
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
      params: compact(params),
    }),
  )
}

export function post(url, data, config = {}) {
  return request(
    Object.assign(config, {
      method: 'post',
      url,
      data,
    }),
  )
}
