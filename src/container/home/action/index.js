import { action } from 'mobx'
import request from '../../../util/request'
import store from '../store'

class Actions {
  constructor(store) {
    this.store = store
  }

  getMsg = () => {
    request('/home').then(action(data => {
      this.store.msg = data.helloMsg
    }))
  }
}

export default new Actions(store)
