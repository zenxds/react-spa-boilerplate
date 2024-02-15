/**
 * 入口
 */
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import { getPopupContainer, getPublicPath } from '@/utils'
import { GlobalStoreProvider } from './stores'
import App from './app'

// 不允许在动作外部修改状态
// configure({ enforceActions: 'observed' })

__webpack_public_path__ = window.PUBLIC_PATH || getPublicPath() || ''

createRoot(document.getElementById('app') as HTMLElement).render(
  <ConfigProvider locale={zhCN} getPopupContainer={getPopupContainer}>
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>
  </ConfigProvider>,
)
