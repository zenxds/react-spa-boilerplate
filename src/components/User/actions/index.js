import BaseActions from '@components/BaseActions'

import paths from '@constants/paths'
import * as constants from '../constants'
import store from '../store'

class Actions extends BaseActions {
  mergeUserInfo(data = {}) {
    this.merge(this.store.user, data)
  }

  async getUserInfo() {
    try {
      const userInfo = await this.get(constants.API_USER_INFO)
      this.mergeUserInfo(userInfo)
      this.merge({ isLogin: true })
    } catch (err) {
      this.merge({ isLogin: false })
      location.href = '#' + paths.login
    }
  }

  async logout() {
    return await this.get(constants.API_LOGOUT)
  }

  async login(data = {}) {
    return await this.post(constants.API_LOGIN, data)
  }

  async loginSuccess() {
    try {
      await this.getUserInfo()
    } catch (e) {
      return
    }

    location.href = '#' + paths.index
  }
}

export default new Actions(store)
