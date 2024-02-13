import { get, post } from '@utils/request'

export const getHomeList = (params = {}) => {
  return get('/api/list', params)
}
