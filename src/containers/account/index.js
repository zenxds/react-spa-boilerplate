import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout } from '@dx/xbee'

import { isObject } from '@utils'
import * as decorators from '@decorators'
import Toolbar from './components/Toolbar'
import Table from './components/Table'
import { FIELD_NAME_MAP } from './constants'
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

  async componentDidMount() {
    const metaInfo = await this.getMetaInfo()

    for (let key in metaInfo.meta) {
      if (FIELD_NAME_MAP[key]) {
        metaInfo.meta[key].label = FIELD_NAME_MAP[key]
      }
    }

    this.props.actions.merge({
      ...metaInfo
    })

    this.setState({
      loading: false,
    })
  }


  async getMetaInfo() {
    const meta = await this.props.actions.getMetaInfo()
    let filters = meta?.filter_fields || []

    if (isObject(filters)) {
      filters = Object.keys(filters).map(item => {
        return {
          name: item,
          lookups: filters[item] || []
        }
      })
    } else {
      // ['name', 'code']
      filters = filters.map(item => {
        return {
          name: item,
          lookups: []
        }
      })
    }

    return {
      meta: meta?.serializer || {},
      filters: filters,
    }
  }

  render() {
    const { loading } = this.state

    if (loading) {
      return null
    }

    return (
      <Layout.Main title="账号管理">
        <Toolbar />
        <Table />
      </Layout.Main>
    )
  }
}
