import { makeAutoObservable } from 'mobx'

class Store {
  isLogin = !!window.user
  user = window.user ? JSON.parse(window.user) : {}

  constructor() {
    makeAutoObservable(this)
  }

  get username() {
    return this.user.username
  }
}

export default new Store()
