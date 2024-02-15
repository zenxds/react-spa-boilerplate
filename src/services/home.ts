import { get, post } from '@/utils/request'

import type { CommonListResponse } from '@/types'

export const getHomeList = (
  params = {},
): Promise<CommonListResponse<any> | undefined> => {
  return get('/api/home/list', params)
}

export const createHomeItem = (data = {}) => {
  return post('/api/home/create', data)
}

export const editHomeItem = (data = {}) => {
  return post('/api/home/edit', data)
}

export const deleteHomeItem = (data = {}) => {
  return post('/api/home/delete', data)
}
