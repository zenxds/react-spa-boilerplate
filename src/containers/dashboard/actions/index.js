import BaseActions from 'components/BaseActions'
import * as constants from '../constants'
import store from '../store'

class Actions extends BaseActions {
  async getMsg() {
    const data = await this.get(constants.API_MSG)

    this.merge({
      msg: data.helloMsg,
    })
  }
}

export default new Actions(store)
