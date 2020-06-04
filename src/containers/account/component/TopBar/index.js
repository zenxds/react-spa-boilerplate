import React, { Component, Fragment } from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Input, Button, message } from '@dx/xbee'
import { DxFormModal, DxToolbar } from '@dx/xpanda'

import ItemForm from '../ItemForm'
import './styles.less'

@inject('actions', 'store')
@observer
export default class TopBar extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      showCreateModal: false,
    }
  }

  handleChange = (type, event) => {
    const target = event && event.target
    const value = target ? target.value : event

    this.props.actions.mergeConditions({
      [type]: value,
    })
  }

  // 搜索时才修改store的值触发下面Table的监听
  handleSearch = async () => {
    this.props.actions.merge({
      fetchId: new Date().getTime(),
    })
  }

  handleShowCreateModal = () => {
    this.setState({
      showCreateModal: true,
    })
  }

  handleHideCreateModal = () => {
    this.setState({
      showCreateModal: false,
    })
  }

  handleCreateSuccess = value => {
    // 失败被request catch了
    if (value === undefined) {
      return
    }

    message.success('新建成功')
    this.handleReset()
    this.handleHideCreateModal()
  }

  handleReset = () => {
    this.props.actions.resetSearch()
  }

  render() {
    const { store } = this.props
    const conditions = toJS(store.conditions)
    const { showCreateModal } = this.state

    return (
      <Fragment>
        <DxToolbar
          onSearch={this.handleSearch}
          loading={store.loading}
          extra={
            <Button type="primary" onClick={this.handleShowCreateModal}>
              新建
            </Button>
          }
        >
          <DxToolbar.Item label="名称">
            <Input
              onChange={this.handleChange.bind(this, 'name')}
              onPressEnter={this.handleSearch}
              allowClear
              value={conditions.name}
              placeholder="请输入名称"
            />
          </DxToolbar.Item>
        </DxToolbar>

        {showCreateModal ? (
          <DxFormModal
            width={600}
            title="新建"
            action={this.props.actions.createItem}
            onSuccess={this.handleCreateSuccess}
            onCancel={this.handleHideCreateModal}
          >
            <ItemForm />
          </DxFormModal>
        ) : null}
      </Fragment>
    )
  }
}
