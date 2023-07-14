import { makeAutoObservable, observable, toJS } from 'mobx'

class Store {
  loading = false
  // 触发获取数据用
  fetchId = 0
  // 查询条件
  conditions = observable.map({})

  constructor() {
    makeAutoObservable(this)
  }

  get conditionsObject() {
    return Object.fromEntries(toJS(this.conditions))
  }
}

export default new Store()
