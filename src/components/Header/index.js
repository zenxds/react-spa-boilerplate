import React, { Fragment } from 'react'
import { observer } from 'mobx-react'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { useGlobalStores } from '@stores'

import paths from '@constants/paths'
import './less/styles.less'

const handleLogout = () => {
  location.href = paths.logout
}

const items = [
  {
    label: <a onClick={handleLogout}>安全退出</a>,
    key: 'logout',
  },
]

export default observer(() => {
  const { userStore } = useGlobalStores()

  return (
    <Fragment>
      <div styleName="header-info">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <div styleName="user-info">
            <a styleName="user-name" title={userStore.username}>
              {userStore.username}
              <DownOutlined style={{ marginLeft: '3px' }} />
            </a>
          </div>
        </Dropdown>
      </div>
    </Fragment>
  )
})
