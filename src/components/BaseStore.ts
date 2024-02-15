import { action } from 'mobx'

// import type { ObservableMap } from 'mobx'

export default class Store {
  conditions: any
  initialConditions: any

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
    this.conditions.replace(this.initialConditions || {})
  }
}
