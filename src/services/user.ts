import { post } from '@/utils/request'

import type { UserLoginDataType, UserRegisterDataType } from '@/types'

export const login = (data: UserLoginDataType) => {
  return post('/api/user/login', data)
}

export const register = (data: UserRegisterDataType) => {
  return post('/api/user/register', data)
}
