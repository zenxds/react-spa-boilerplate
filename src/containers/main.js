import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Switch,
  withRouter
} from 'react-router-dom'

import '../less/antd.less'
import '../less/app.less'

import Header from 'components/Header'
import Menu from 'components/Menu'
import Dynamic from './dynamic'

@withRouter
@observer
export default class Main extends Component {
  render() {
    return (
      <div className="app-root">
        <div className="app-header">
          <Header />
        </div>
        <div className="app-wrapper">
          <div className="app-menu">
            <Menu />
          </div>
          <div className="app-content">
            <Switch>
              <Dynamic
                exact
                path="/"
                bundle={require('bundle-loader?lazy!./home')}
              />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
