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

import Dynamic from './dynamic'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/page1">Page1</Link></li>
            <li><Link to="/page2">Page2</Link></li>
          </ul>
          <Switch>
            <Dynamic exact path="/" load={require('bundle-loader?lazy!./container/page1')} />
            <Dynamic path="/page1" load={require('bundle-loader?lazy!./container/page1')} />
            <Dynamic path="/page2" load={require('bundle-loader?lazy!./container/page2')} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default CSSModules(App, styles)