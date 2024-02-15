import { useState } from 'react'
import { observer } from 'mobx-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'

import { useGlobalStores } from '@/stores'
import './styles.less'

/**
 * 进入一些菜单之外的页面
 * 关联菜单仍然要高亮
 * 要把所有的可访问页面都归于一个菜单下
 *
 * 这里是应该高亮的菜单，不是真正的currentPath
 */
function useCurrentPath() {
  const location = useLocation()
  const pathname = location.pathname
  const { menuStore } = useGlobalStores()
  const { pathMap } = menuStore

  for (let p in pathMap) {
    // 去掉/这种情况
    if (pathname.startsWith(p) && p !== '/') {
      return p
    }
  }

  return pathname
}

// 一个菜单展开时，它的父菜单也应该展开
function useOpenKeys() {
  const { menuStore } = useGlobalStores()
  const { pathMap, parentMap } = menuStore
  const currentPath = useCurrentPath()
  const current = pathMap[currentPath]
  const openKeys = []

  let currentCode = current && current.code
  while (currentCode) {
    openKeys.push(currentCode)
    currentCode = parentMap[currentCode]
  }

  return openKeys
}

export default observer(() => {
  const { menuStore } = useGlobalStores()
  const menus = menuStore.normalized
  const defaultOpenKeys = useOpenKeys()
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys)
  const location = useLocation()
  const navigate = useNavigate()

  if (!menus.length) {
    return null
  }

  const handleClick = ({ item }: { item: any }) => {
    const pathname = location.pathname
    const target = item.props.path

    if (pathname !== target) {
      navigate(target)
    }
  }

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      openKeys={openKeys}
      selectedKeys={defaultOpenKeys.slice(0, 1)}
      onClick={handleClick}
      onOpenChange={handleOpenChange}
      items={menus as any}
    />
  )
})
