import BaseActions from '@components/BaseActions'
import { REST_API } from '../constants/apis'
import store from '../store'

class Actions extends BaseActions {
  getList = (params = {}) => {
    return this.get(REST_API, params)
  }

  getMetaInfo = () => {
    return this.request({
      method: 'options',
      url: REST_API
    })
  }

  createItem = (data = {}) => {
    return this.post(REST_API, data)
  }

  editItem = (data = {}) => {
    return this.request({
      method: 'patch',
      url: REST_API + data.id + '/',
      data
    })
  }

  deleteItem = (data = {}) => {
    return this.request({
      method: 'delete',
      url: REST_API + data.id + '/',
      data
    })
  }
}

export default new Actions(store)
