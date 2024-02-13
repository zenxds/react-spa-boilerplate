import { get, post } from '@utils/request'

export const getHomeList = (params = {}) => {
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
