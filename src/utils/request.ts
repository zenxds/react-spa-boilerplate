import { Toast } from 'antd-mobile'
import axios from 'axios'

import { API_SERVER } from '@/constants'

import type { AxiosRequestConfig } from 'axios'
import type { CommonResponse } from '@/types'

interface RequestConfig extends AxiosRequestConfig {
  catchError?: boolean
  returnResponseData?: boolean
}

const messageMap: Record<string, string> = {
  'request error': '请求失败，请稍后重试',
  'Network Error': '网络出错，请检查您的网络状况',
  'Request failed with status code 502': '服务器出小差了，请稍后重试',
}

const instance = axios.create({
  baseURL: API_SERVER,
})

export default function request<T>(
  config: RequestConfig = {},
): Promise<T | undefined> {
  config = Object.assign(
    {
      // catchError为自定义配置，是否捕获错误
      catchError: true,
      // 是否返回整个response data，默认返回接口里的data字段
      returnResponseData: false,
      withCredentials: true,
      timeout: 10 * 60 * 1000,
    },
    config,
  )

  const ret = instance(config).then(response => {
    const { success, data, message } = response.data as CommonResponse<T>

    if (success) {
      // 后端有的success没有返回data，默认给个true
      return config.returnResponseData
        ? response.data
        : data === undefined
          ? true
          : data
    } else {
      throw new Error(message || '请求失败')
    }
  })

  if (config.catchError) {
    return ret.catch((err: Error) => {
      Toast.show({
        icon: 'fail',
        content: messageMap[err.message] || err.message,
      })
    })
  }

  return ret
}

// https://github.com/axios/axios/blob/master/lib/core/Axios.js
export function get<T>(
  url: string,
  params: any = {},
  config: RequestConfig = {},
) {
  return request<T>(
    Object.assign(config, {
      method: 'get',
      url,
      params,
    }),
  )
}

export function post<T>(url: string, data: any, config: RequestConfig = {}) {
  const formDate = new FormData()

  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      formDate.append(key, data[key])
    }
  })

  return request<T>(
    Object.assign(config, {
      method: 'post',
      url,
      data,
    }),
  )
}
