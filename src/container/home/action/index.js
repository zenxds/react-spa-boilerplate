import request from '../../../util/request'

export const getHomeInfo = () => {
  return request('/home')
}
