import { Component } from 'react'
import {
  // inject,
  observer,
} from 'mobx-react'
import {
  Switch,
  Route,
  // Redirect,
  withRouter,
} from 'react-router-dom'
import loadable from '@loadable/component'
import { Result } from '@dx/xbee'

import paths from '@constants/paths'
import Header from '@components/Header'
import Menu from '@components/Menu'

function load(page) {
  return loadable(() => import(`./${page}`))
}

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
              <Route exact path="/" component={load('home')} />
              <Route exact path={paths.index} component={load('dashboard')} />
              <Route exact path={paths.account} component={load('account')} />
              <Route path="/">
                <Result status="404" />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
