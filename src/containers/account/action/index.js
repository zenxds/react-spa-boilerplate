import { action } from 'mobx'
import BaseActions from '@components/BaseActions'
import * as apis from '../constant/apis'
import store from '../store'

class Actions extends BaseActions {
  mergeConditions = (params = {}) => {
    this.merge(this.store.conditions, params)
  }

  @action
  resetSearch() {
    const conditions = this.store.conditions
    const newConditions = new this.store.constructor().conditions

    conditions.replace(newConditions.toJSON())
    this.merge({
      fetchId: new Date().getTime(),
    })
  }

  getList = (params = {}) => {
    return this.get(apis.API_GET_LIST, params)
  }

  createItem = (params = {}) => {
    return this.post(apis.API_CREATE_ITEM, params)
  }

  editItem = (params = {}) => {
    return this.post(apis.API_EDIT_ITEM, params)
  }

  deleteItem = (params = {}) => {
    return this.post(apis.API_DELETE_ITEM, params)
  }
}

export default new Actions(store)
