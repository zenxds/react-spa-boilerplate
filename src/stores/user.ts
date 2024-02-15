import { makeAutoObservable } from 'mobx'

import type { UserType } from '@/types'

class UserStore {
  isLogin = !!window.user
  user: UserType = window.user ? JSON.parse(window.user) : {}

  constructor() {
    makeAutoObservable(this)
  }

  get username() {
    return this.user.username
  }
}

export default new UserStore()
