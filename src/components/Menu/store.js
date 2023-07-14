import { makeAutoObservable } from 'mobx'
import { ScheduleOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons'

import paths from '@constants/paths'

function normalize(arr = [], level = 1) {
  return arr.map(item => {
    item.level = level
    item.key = item.code

    if (paths[item.code]) {
      item.path = paths[item.code]
    }

    if (item.children && item.children.length) {
      item.children = normalize(item.children, level + 1)
    }

    return item
  })
}

class Store {
  menus = [
    {
      label: '任务配置',
      code: 'index',
      icon: <ScheduleOutlined />,
    },
    {
      label: '通知配置',
      code: 'notificationConfig',
      icon: <WechatOutlined />,
    },
    {
      label: '登录配置',
      code: 'loginConfig',
      icon: <UserOutlined />,
    },
  ]

  constructor() {
    makeAutoObservable(this)
  }

  get normalized() {
    return normalize(this.menus)
  }

  get pathMap() {
    const map = {}

    function walk(list) {
      list.forEach(item => {
        if (item.children) {
          walk(item.children)
        }

        map[item.path] = {
          code: item.code,
          path: item.path,
          label: item.label,
        }
      })
    }

    walk(this.normalized)
    return map
  }

  get parentMap() {
    const map = {}

    function walk(list, parentCode) {
      list.forEach(item => {
        if (item.children) {
          walk(item.children, item.code)
        }

        if (parentCode) {
          map[item.code] = parentCode
        }
      })
    }

    walk(this.normalized)
    return map
  }
}

export default new Store()
