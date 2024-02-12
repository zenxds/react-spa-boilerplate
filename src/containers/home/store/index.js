import { observable } from 'mobx'

import BaseStore from '@components/BaseStore'

class Store extends BaseStore {
  @observable loading = false
  // 触发获取数据用
  @observable fetchId = 0
  // 查询条件
  @observable conditions = observable.map({})
}

export default new Store()
