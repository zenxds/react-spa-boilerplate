import { UserType } from './user'
import { MenuItemType } from './menu'

export interface GlobalContextType {
  isLogin: boolean
  user?: UserType
}

export interface MenuContextType {
  menus: MenuItemType[]
  pathMap: Record<string, MenuItemType>
  parentMap: Record<string, string>
}
