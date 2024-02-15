export interface MenuItemType {
  code: string
  label: string
  icon?: React.ReactNode
  path?: string
  level?: number
  key?: string
  children?: MenuItemType[]
}
