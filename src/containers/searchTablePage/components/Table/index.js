import React, { Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Table, Tooltip, message } from '@dx/xbee'
import { DxFormModal, DxTableBtn } from '@dx/xpanda'

import Base from '@components/BasePage/SearchTable/Table'
import { pick, compact, keyBy } from '@utils'

import ItemForm from '../ItemForm'

@inject('actions', 'store')
@observer
export default class PageTable extends Base {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      pageSize: 10,
      items: [],
      itemCount: 0,

      editItem: null,
    }
  }

  fetchData = async (query = {}) => {
    const { store, actions } = this.props

    query = Object.assign(
      toJS(store.pageConditions),
      pick(['page', 'pageSize'], this.state),
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
      this.setState({
        items: data.results,
        itemCount: data.count,
        page: query.page,
        pageSize: query.pageSize,
      })
    }
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
      message.success('删除成功')
      this.props.actions.resetConditions('page')
    }
  }

  getColumns() {
    const { meta } = this.props.store
    const columns = Object.keys(meta).filter(key => key !== 'id').map(key => {
      const type = meta[key].type
      return {
        dataIndex: key,
        title: meta[key].label,
        render: v => {
          if (type === 'url') {
            return <a href={v}>链接</a>
          }

          if (type === 'choice') {
            const map = keyBy(meta[key].choices, 'value')
            return map[v] ? map[v].display_name : v
          }

          return v
        }
      }
    })

    return [
      ...columns,
      {
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => {
          return (
            <DxTableBtn.Group record={record}>
              <DxTableBtn type="edit" onClick={this.handleEdit} />
              <DxTableBtn
                type="delete"
                deleteTitle={'您确定要删除该记录吗'}
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
