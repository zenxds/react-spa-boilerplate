import { makeAutoObservable } from 'mobx'
import { ScheduleOutlined } from '@ant-design/icons'

import { paths } from '@/constants'
import type { MenuItemType } from '@/types'

function normalize(arr: MenuItemType[] = [], level = 1) {
  return arr.map((item) => {
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
    const map: Record<string, MenuItemType> = {}

    function walk(list: MenuItemType[]) {
      list.forEach((item) => {
        if (item.children) {
          walk(item.children)
        }

        if (item.path) {
          map[item.path] = {
            code: item.code,
            path: item.path,
            label: item.label,
          }
        }
      })
    }

    walk(this.normalized)
    return map
  }

  get parentMap() {
    const map: Record<string, string> = {}

    function walk(list: MenuItemType[], parentCode?: string) {
      list.forEach((item) => {
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
