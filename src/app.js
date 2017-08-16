import { Component } from 'react'
import { connect } from 'react-redux'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CSSModules  from 'react-css-modules'

import './less/antd.less'
import styles from './less/app.less'

import Header from './component/Header'
import Menu from './component/Menu'
import Dynamic from './dynamic'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-root">
          <Header />
          <div className="app-wrapper">
            <div className="app-menu">
              <Menu />
            </div>
            <div className="app-content">
              <Switch>
                <Dynamic exact path="/" load={require('bundle-loader?lazy!./container/page1')} />
                <Dynamic path="/page1" load={require('bundle-loader?lazy!./container/page1')} />
                <Dynamic path="/page2" load={require('bundle-loader?lazy!./container/page2')} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default CSSModules(App, styles)
