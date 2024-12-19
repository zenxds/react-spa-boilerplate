import { createContext, useContext } from 'react'

import type { MenuContextType } from '@/types'

const MenuContext = createContext<MenuContextType>({
  menus: [],
  parentMap: {},
  pathMap: {},
})

export function getMenuContext() {
  return MenuContext
}

export function useMenuContext() {
  return useContext(MenuContext)
}
