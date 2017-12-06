/**
 * 入口
 */
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { useStrict } from 'mobx'
import { AppContainer } from 'react-hot-loader'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import App from './app'
import injects from './inject'

// 不允许在@action之外进行状态的修改
useStrict(true)

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...injects}>
        <LocaleProvider locale={zhCN}>
          <Component />
        </LocaleProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)
if (module.hot) {
  module.hot.accept('./app', () => { render(App)})
}
