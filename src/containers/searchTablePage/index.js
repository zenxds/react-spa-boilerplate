import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout } from '@dx/xbee'

import { getHashPath } from '@utils'
import * as decorators from '@decorators'
import Toolbar from './components/Toolbar'
import Table from './components/Table'
import actions from './action'
import store from './store'
import './styles.less'

@decorators.errorBoundary
@decorators.provider({
  actions,
  store,
})
@inject('actions', 'store', 'menuStore')
@observer
export default class Page extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  getMenuInfo() {
    const { menuStore } = this.props
    const { pathMap } = menuStore
    const currentPath = getHashPath()

    if (pathMap[currentPath]) {
      return pathMap[currentPath]
    }

    return {
      name: '',
      code: ''
    }
  }

  async componentDidMount() {
    const menu = this.getMenuInfo()
    this.props.actions.merge({
      code: menu.code,
    })

    const meta = await this.getMetaInfo()
    this.setState({
      loading: false,
    })

    this.props.actions.merge({
      menu,
      meta
    })
  }


  async getMetaInfo() {
    const meta = await this.props.actions.getMetaInfo()

    return meta?.actions?.POST || {}
  }

  render() {
    const { loading } = this.state
    const { menu } = this.props.store

    if (loading) {
      return null
    }

    return (
      <Layout.Main title={menu.name}>
        <Toolbar />
        <Table />
      </Layout.Main>
    )
  }
}
