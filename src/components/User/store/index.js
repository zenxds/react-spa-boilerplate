import { observable, computed } from 'mobx'

class Store {
  @observable isLogin = undefined
  @observable user = {}

  @computed get nickName() {
    return this.user.username
  }

  hasPermission = code => {
    return !!code
  }
}

export default new Store()
