import BaseActions from '@components/BaseActions'
import store from '../store'

class Actions extends BaseActions {
  getList = (params = {}) => {
    const { code } = this.store
    return this.get('/api/' + code + '/', params)
  }

  getMetaInfo = () => {
    const { code } = this.store
    return this.request({
      method: 'options',
      url: '/api/' + code + '/'
    })
  }

  createItem = (data = {}) => {
    const { code } = this.store
    return this.post('/api/' + code + '/', data)
  }

  editItem = (data = {}) => {
    const { code } = this.store
    return this.request({
      method: 'patch',
      url: `/api/${code}/${data.id}/`,
      data
    })
  }

  deleteItem = (data = {}) => {
    const { code } = this.store
    return this.request({
      method: 'delete',
      url: `/api/${code}/${data.id}/`,
      data
    })
  }
}

export default new Actions(store)
