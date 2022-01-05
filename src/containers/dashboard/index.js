import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import * as decorators from '@decorators'
import { Layout } from '@dx/xbee'
import actions from './actions'
import store from './store'

@decorators.errorBoundary
@decorators.provider({
  actions,
  store,
})
@inject('actions', 'store')
@observer
export default class Dashboard extends Component {
  render() {
    return <Layout.Main title="总览" />
  }
}
