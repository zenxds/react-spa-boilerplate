import { Component } from 'react'
import { reaction } from 'mobx'
import { message } from 'antd'

import { pick } from '@utils'

export default class PageTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      page: 1,
      pageSize: 15,
      itemCount: 0,

      editItem: null,
      copyItem: null,
    }
  }

  componentDidMount() {
    this.initReaction()
  }

  componentWillUnmount() {
    this.disposer()
  }

  initReaction() {
    const { store } = this.props

    // fetchId变化时重新请求数据
    this.disposer = reaction(
      () => {
        return store.fetchId
      },
      () => {
        this.fetchData({
          page: 1,
        })
      },
      {
        fireImmediately: true,
      },
    )
  }

  fetchData = async (query = {}) => {
    const { store, actions } = this.props

    query = Object.assign(
      {},
      store.conditionsObject,
      pick(['page', 'pageSize'], this.state),
      query,
    )

    actions.merge({
      loading: true,
    })
    const data = await actions.getList(query)
    actions.merge({
      loading: false,
    })

    if (data) {
      this.processData(data)

      this.setState({
        itemCount: data.count,
        items: data.rows,
        page: query.page,
        pageSize: query.pageSize,
      })
    }
  }

  processData(data) {
    return data
  }

  handleValues(values) {
    return values
  }

  handlePageChange = async (page, pageSize) => {
    return this.fetchData({ page, pageSize })
  }

  getDataSource() {
    const { items } = this.state
    return items.slice()
  }

  getPagination() {
    const { page, pageSize, itemCount } = this.state

    return {
      current: page,
      total: itemCount,
      pageSize: pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: this.handlePageChange,
      onShowSizeChange: this.handlePageChange,
    }
  }

  handleEdit = record => {
    this.setState({
      editItem: record,
    })
  }

  handleCancelEdit = () => {
    this.setState({
      editItem: null,
    })
  }

  handleEditSuccess = value => {
    // 失败被request catch了
    if (value === undefined) {
      return
    }

    message.success('编辑成功')
    this.handleCancelEdit()
    this.fetchData()
  }

  handleCopy = async record => {
    const copyItem = Object.assign({}, record)
    delete copyItem.id

    this.setState({
      copyItem,
    })
  }

  handleCancelCopy = async () => {
    this.setState({
      copyItem: null,
    })
  }

  handleCopySuccess = async value => {
    // 失败被request catch了
    if (value === undefined) {
      return
    }

    message.success('新建成功')
    this.handleCancelCopy()
    this.fetchData()
  }

  submitDelete = async record => {
    const { actions } = this.props
    const r = await actions.deleteItem({
      id: record.id,
    })

    if (r) {
      message.success(`删除${record.name}成功`)
      actions.resetConditions()
    }
  }
}
