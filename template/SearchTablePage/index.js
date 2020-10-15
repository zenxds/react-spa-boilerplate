import { Component } from 'react'
// import { observer, inject } from 'mobx-react'
import { Layout } from '@dx/xbee'

import * as decorators from '@decorators'
import TopBar from './components/TopBar'
import Table from './components/Table'
import actions from './action'
import store from './store'
import './styles.less'

@decorators.errorBoundary
@decorators.provider({
  actions,
  store,
})
// @inject('actions')
// @observer
export default class Page extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Layout.DxMain title="账号管理">
        <TopBar />
        <Table />
      </Layout.DxMain>
    )
  }
}
