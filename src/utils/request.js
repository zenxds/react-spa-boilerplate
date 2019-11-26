import axios from 'axios'
import isPlainObject from './isPlainObject'
import { param } from './param'

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

export default function request(config = {}) {
  config = Object.assign(
    {
      withCredentials: true,
      timeout: 30 * 1000
    },
    config
  )

  return axios(config).then(response => {
    const { success, data, message } = response.data || {}

    if (success) {
      return data
    } else {
      throw new Error(message || '请求失败')
    }
  })
}

// https://github.com/axios/axios/blob/master/lib/core/Axios.js
export function get(url, params = {}, config = {}) {
  return request(
    Object.assign(config, {
      method: 'get',
      url,
      params
    })
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
      data
    })
  )
}

export function jsonPost(url, data = {}, config = {}) {
  return request(
    Object.assign(config, {
      method: 'post',
      url,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  )
}
