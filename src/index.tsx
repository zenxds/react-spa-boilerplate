/**
 * 入口
 */
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd-mobile'
import zhCN from 'antd-mobile/es/locales/zh-CN'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import { getPublicPath } from '@/utils'
import { GlobalStoreProvider } from './stores'
import App from './app'

// 不允许在动作外部修改状态
// configure({ enforceActions: 'observed' })

__webpack_public_path__ = window.PUBLIC_PATH || getPublicPath() || ''

createRoot(document.getElementById('app') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>
  </ConfigProvider>,
)
