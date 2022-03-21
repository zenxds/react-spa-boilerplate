import BaseActions from '@components/BaseActions'
import { API_USER_INFO, AUTH_KEY } from '@constants'

import * as constants from '../constants'
import store from '../store'

class Actions extends BaseActions {
  async getUserInfo() {
    const userInfo = await this.get(API_USER_INFO)
    if (userInfo) {
      this.merge({ isLogin: true, user: userInfo })
    } else {
      this.merge({ isLogin: false })
    }

    return userInfo
  }

  async logout() {
    localStorage.removeItem(AUTH_KEY)
    return true
  }

  async login(data = {}) {
    return await this.post(constants.API_LOGIN, data)
  }

  async loginSuccess(data = {}) {
    console.log(data)
    if (data.token) {
      localStorage.setItem(AUTH_KEY, data.token)
    }

    await this.getUserInfo()
    location.href = '#/'
  }
}

export default new Actions(store)
