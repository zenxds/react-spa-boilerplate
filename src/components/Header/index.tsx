import { useCallback } from 'react'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { useGlobalContext } from '@/context'
import { paths } from '@/constants'
import './styles.module.less'

export default () => {
  const { user } = useGlobalContext()
  const handleLogout = useCallback(() => {
    location.href = paths.logout
  }, [])

  const items = [
    {
      label: <a onClick={handleLogout}>安全退出</a>,
      key: 'logout',
    },
  ]

  return (
    <>
      <div styleName="header-info">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <div styleName="user-info">
            <a styleName="user-name" title={user?.username}>
              {user?.username}
              <DownOutlined style={{ marginLeft: '3px' }} />
            </a>
          </div>
        </Dropdown>
      </div>
    </>
  )
}
