import { observable, action } from "mobx"
import request from '../../../util/request'

class Store {
  @observable msg = ''

  constructor() {
    this.getHomeInfo()
  }

  getHomeInfo() {
    request('/home').then(action(data => {
      this.msg = data.helloMsg
    }))
  }
}

export default new Store()
