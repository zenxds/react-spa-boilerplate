import { makeAutoObservable } from 'mobx'
import { ScheduleOutlined } from '@ant-design/icons'

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

class MenuStore {
  menus = [
    {
      label: '首页',
      code: 'index',
      icon: <ScheduleOutlined />,
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

export default new MenuStore()
