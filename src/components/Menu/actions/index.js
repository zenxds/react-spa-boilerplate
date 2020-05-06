import BaseActions from '@components/BaseActions'

import * as constants from '../constants'
import store from '../store'

class Actions extends BaseActions {
  getMenu = () => {
    return this.get(constants.MENU_INFO).then(data => {
      this.merge({
        menus: addLevel(data),
      })
    })
  }
}

function addLevel(arr = [], lv = 1) {
  return arr.map(item => {
    item.level = lv
    if (item.children && item.children.length) {
      item.children = addLevel(item.children, lv + 1)
    }
    return item
  })
}

export default new Actions(store)
