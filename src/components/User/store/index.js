import { observable, computed } from 'mobx'

class Store {
  @observable isLogin = undefined
  @observable user = observable.map({})

  @computed get nickName() {
    return this.user.get('name')
  }
}

export default new Store()
