import { get, post } from '@utils/request'

export const login = (data = {}) => {
  return post('/user/api/login', data)
}

export const register = (data = {}) => {
  return post('/user/api/register', data)
}
