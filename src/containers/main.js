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

import '../less/antd.less'
import '../less/app.less'

import paths from '@constants/paths'
import Header from 'components/Header'
import Menu from 'components/Menu'
import NotFound from 'components/404'
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
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
