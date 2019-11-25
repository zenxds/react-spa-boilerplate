import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Menu as AntDMenu, Icon } from 'antd'
import classnames from 'classnames'

import { startsWith } from 'utils'
import paths from 'constants/paths'
import './less/styles.less'

const { Item, SubMenu } = AntDMenu

@inject('menuStore', 'menuActions', 'userStore', 'userActions')
@withRouter
@observer
class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openKeys: []
    }
  }

  componentDidMount() {
    this.props.menuActions.getMenu().then(() => {
      this.setState({
        openKeys: this.getOpenKeys()
      })
    })
  }

  /**
   * 进入一些菜单之外的页面
   * 关联菜单仍然要高亮
   * 要把所有的可访问页面都归于一个菜单下
   *
   * 这里是应该高亮的菜单，不是真正的currentPath
   */
  getCurrentPath() {
    const { location } = this.props
    const pathname = location.pathname

    for (let i in paths) {
      const p = paths[i]

      // 去掉/这种情况
      if (startsWith(pathname, p) && p !== '/') {
        return p
      }
    }

    return pathname
  }

  getOpenKeys() {
    const { menuStore } = this.props
    const { parentMap } = menuStore
    const openKeys = []

    let current = this.getCurrentPath()
    while (current) {
      openKeys.push(current)
      current = parentMap[current]
    }

    return openKeys
  }

  handleOpenChange = keys => {
    this.setState({
      openKeys: keys
    })
  }

  handleClick = e => {
    const router = this.context.router
    const pathname = router.route.location.pathname
    const target = e.item.props.pathname

    if (pathname !== target) {
      router.history.push(target)
    }
  }

  renderMenu(menus = []) {
    menus = menus.slice()

    return menus.map(menu => {
      if (menu.children && menu.children.length) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <div>
                {menu.level == 1 ? (
                  <i
                    className={classnames(
                      'menu-icon',
                      'anticon',
                      `menu-icon-${menu.code}`,
                      { 'menu-icon-active': false }
                    )}
                  />
                ) : null}
                <span>{menu.name}</span>
              </div>
            }
          >
            {this.renderMenu(menu.children)}
          </SubMenu>
        )
      }

      return (
        <Item
          key={menu.path}
          pathname={menu.path}
          className={`menu-lv${menu.level}`}
        >
          {menu.level == 1 ? (
            <i
              className={classnames(
                'menu-icon',
                'anticon',
                `menu-icon-${menu.code}`
              )}
            />
          ) : null}
          <span>{menu.name}</span>
        </Item>
      )
    })
  }

  render() {
    const { menus } = this.props.menuStore
    const { openKeys } = this.state
    // 当前应当打开的菜单，当前路径的父路径都应该打开
    const defaultOpenKeys = this.getOpenKeys()

    return (
      <div>
        <AntDMenu
          mode="inline"
          theme="dark"
          selectedKeys={[defaultOpenKeys[0]]}
          openKeys={openKeys}
          defaultOpenKeys={defaultOpenKeys}
          onClick={this.handleClick}
          onOpenChange={this.handleOpenChange}
        >
          {this.renderMenu(menus)}
        </AntDMenu>
      </div>
    )
  }
}

Menu.contextTypes = {
  router: PropTypes.object
}

export default Menu
