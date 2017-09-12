/**
 * 入口
 */
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { AppContainer } from 'react-hot-loader'

import App from './app'

// 不允许在@action之外进行状态的修改
useStrict(true)

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App)
if (module.hot) {
  module.hot.accept('./app', () => { render(App)})
}
