import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import * as decorators from 'decorators'
import actions from './actions'
import store from './store'

@decorators.errorBoundary
@decorators.provider({
  actions,
  store,
})
@inject('actions', 'store')
@observer
class Dashboard extends Component {
  componentDidMount() {
    this.props.actions.getMsg()
  }

  render() {
    return <div>{this.props.store.msg}</div>
  }
}

export default Dashboard
