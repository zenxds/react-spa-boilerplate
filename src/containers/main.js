import { Component } from 'react'
import {
  // inject,
  observer,
} from 'mobx-react'
import {
  // BrowserRouter as Router
  // HashRouter as Router,
  Switch,
  Route,
  // Redirect,
  withRouter,
} from 'react-router-dom'
import { Result } from '@dx/xbee'

import paths from '@constants/paths'
import Header from '@components/Header'
import Menu from '@components/Menu'
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
              {/*
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={paths.index} />}
                />
              */}
              <Dynamic
                exact
                path={paths.index}
                bundle={require('bundle-loader?lazy!./dashboard')}
              />
              <Dynamic
                exact
                path={paths.account}
                bundle={require('bundle-loader?lazy!./account')}
              />
              <Route path="/" render={() => <Result status="404" />} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
