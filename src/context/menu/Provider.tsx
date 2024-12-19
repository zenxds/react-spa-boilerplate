import React, { useMemo } from 'react'

import { paths } from '@/constants'
import { menus } from './constants'
import { getMenuContext } from './index'

import type { MenuContextType, MenuItemType } from '@/types'

function normalize(arr: MenuItemType[] = [], level = 1) {
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

export function MenuContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const MenuContext = getMenuContext()
  const pathMap: Record<string, MenuItemType> = useMemo(() => {
    const map: Record<string, MenuItemType> = {}

    function walk(list: MenuItemType[]) {
      list.forEach(item => {
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

    walk(normalize(menus))
    return map
  }, [])

  const parentMap: Record<string, string> = useMemo(() => {
    const map: Record<string, string> = {}

    function walk(list: MenuItemType[], parentCode?: string) {
      list.forEach(item => {
        if (item.children) {
          walk(item.children, item.code)
        }

        if (parentCode) {
          map[item.code] = parentCode
        }
      })
    }

    walk(normalize(menus))
    return map
  }, [])

  const contextValue: MenuContextType = useMemo(() => {
    return {
      menus: normalize(menus),
      parentMap,
      pathMap,
    }
  }, [pathMap, parentMap])

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  )
}
