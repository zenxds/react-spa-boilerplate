import { observable } from 'mobx'

class Store {
  // 触发获取数据用
  @observable fetchId = 0
  // 查询条件
  @observable conditions = observable.map({})

  @observable loading = false
}

export default new Store()
