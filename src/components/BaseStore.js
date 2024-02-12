import { observable, action } from 'mobx'

export default class Store {
  // conditions = observable.map({})

  @action
  merge(obj = {}) {
    Object.assign(this, obj)
  }

  @action
  mergeConditions(obj = {}) {
    this.conditions.merge(obj)
  }

  @action
  resetConditions() {
    this.conditions = observable.map({})
  }
}
