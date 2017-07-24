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

import Page1 from './container/page1'
import Page2 from './container/page2'

import './less/antd.less'
import styles from './less/app.less'

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
            <Route exact path="/" component={Page1}/>
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default CSSModules(App, styles)