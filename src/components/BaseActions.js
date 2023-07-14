import { action, makeObservable } from 'mobx'
import { get, post } from '@utils/request'

export default class BaseActions {
  constructor(store) {
    this.store = store

    makeObservable(this, {
      merge: action
    })
  }

  merge(target = {}, src) {
    if (!src) {
      src = target
      target = this.store
    }

    if (target.merge) {
      target.merge(src)
    } else {
      Object.assign(target, src)
    }
  }

  mergeConditions = (params = {}, type) => {
    this.merge(this.store[type ? `${type}Conditions` : 'conditions'], params)
  }

  resetConditions(type) {
    const field = type ? `${type}Conditions` : 'conditions'
    const conditions = this.store[field]
    const newConditions = new this.store.constructor()[field]

    conditions.replace(newConditions)
    this.merge({
      [type ? `${type}FetchId` : 'fetchId']: new Date().getTime(),
    })
  }

  get(...args) {
    return get(...args)
  }

  post(...args) {
    return post(...args)
  }
}
