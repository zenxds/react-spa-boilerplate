import { post } from '@utils/request'

export const login = (data = {}) => {
  return post('/api/user/login', data)
}

export const register = (data = {}) => {
  return post('/api/user/register', data)
}
