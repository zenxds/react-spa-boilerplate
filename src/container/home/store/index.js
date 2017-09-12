import { observable, action, runInAction } from "mobx"
import * as actions from '../action'

class HomeStore {
  @observable msg = ''

  constructor() {
    this.getHomeInfo()
  }

  getHomeInfo() {
    actions.getHomeInfo().then(data => {
      runInAction(() => {
        this.msg = data.helloMsg
      })
    })
  }
}

export default new HomeStore()
