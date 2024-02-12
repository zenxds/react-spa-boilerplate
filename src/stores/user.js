import { makeAutoObservable } from 'mobx'

class UserStore {
  isLogin = !!window.user
  user = window.user ? JSON.parse(window.user) : {}

  constructor() {
    makeAutoObservable(this)
  }

  get username() {
    return this.user.username
  }
}

export default new UserStore()
