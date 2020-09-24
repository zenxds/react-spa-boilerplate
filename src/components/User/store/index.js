import { observable, computed } from 'mobx'

class Store {
  @observable isLogin = undefined
  @observable user = observable.map({})

  @computed get nickName() {
    return this.user.get('name')
  }

  hasPermission = code => {
    return !!code
  }
}

export default new Store()
