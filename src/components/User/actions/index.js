import BaseActions from '@components/BaseActions'

import paths from '@constants/paths'
import * as constants from '../constants'
import store from '../store'

class Actions extends BaseActions {
  async getUserInfo() {
    const userInfo = await this.get(constants.API_USER_INFO)
    if (userInfo) {
      this.merge({ isLogin: true, user: userInfo })
    } else {
      this.merge({ isLogin: false })
      location.href = '#' + paths.login
    }

    return userInfo
  }

  async logout() {
    return await this.get(constants.API_LOGOUT)
  }

  async login(data = {}) {
    return await this.post(constants.API_LOGIN, data, {
      catchError: false,
    })
  }

  async loginSuccess() {
    const r = await this.getUserInfo()
    if (r) {
      location.href = '#/'
    }
  }
}

export default new Actions(store)
