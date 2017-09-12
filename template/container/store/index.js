import { observable, action } from "mobx"
import request from '../../../util/request'

class Store {
  @observable msg = ''

  constructor() {}
}

export default new Store()
