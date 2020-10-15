import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { reaction, toJS } from 'mobx'
import { Table, Tooltip, message } from '@dx/xbee'
import { DxFormModal, DxTableBtn } from '@dx/xpanda'

import { pick, compact } from '@utils'

import ItemForm from '../ItemForm'

@inject('actions', 'store')
@observer
export default class PageTable extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      pageNo: 1,
      pageSize: 10,
      itemCount: 0,

      editItem: null,
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
        return store.pageFetchId
      },
      () => {
        this.fetchData({
          pageNo: 1,
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
      toJS(store.pageConditions),
      pick(['pageNo', 'pageSize'], this.state),
      query,
    )

    actions.merge({
      loading: true,
    })

    const data = await actions.getList(compact(query))

    actions.merge({
      loading: false,
    })

    if (data) {
      this.setState(data)
    }
  }

  handlePageChange = async (pageNo, pageSize) => {
    return this.fetchData({ pageNo, pageSize })
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

  submitDelete = async record => {
    const r = await this.props.actions.deleteItem({
      id: record.id,
    })

    if (r) {
      message.success(`删除${record.name}成功`)
      this.props.actions.resetSearch()
    }
  }

  getDataSource() {
    const { items } = this.state
    return items.slice()
  }

  getPagination() {
    const { pageNo, pageSize, itemCount } = this.state

    return {
      size: 'small',
      current: pageNo,
      total: itemCount,
      pageSize: pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: this.handlePageChange,
      onShowSizeChange: this.handlePageChange,
    }
  }

  getColumns() {
    return [
      {
        title: '名称',
        dataIndex: 'name',
        render: (name, record) => {
          if (record.desc) {
            return <Tooltip title={record.desc}>{name}</Tooltip>
          }

          return name
        },
      },
      {
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => {
          return (
            <DxTableBtn.Group record={record}>
              <DxTableBtn type="edit" onClick={this.handleEdit} />
              <DxTableBtn
                type="delete"
                deleteTitle={`您确定要删除“${record.name}”吗`}
                onClick={this.submitDelete}
              />
            </DxTableBtn.Group>
          )
        },
      },
    ]
  }

  render() {
    const { loading } = this.props.store

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={this.getColumns()}
          size="small"
          rowKey={record => record.id}
          dataSource={this.getDataSource()}
          pagination={this.getPagination()}
        />
        {this.state.editItem ? (
          <DxFormModal
            dxWidthType="min"
            title="编辑"
            action={this.props.actions.editItem}
            onSuccess={this.handleEditSuccess}
            onCancel={this.handleCancelEdit}
          >
            <ItemForm data={this.state.editItem} />
          </DxFormModal>
        ) : null}
      </Fragment>
    )
  }
}
