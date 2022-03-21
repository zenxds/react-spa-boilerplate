import React, { Fragment } from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Input, Button, Select, message } from '@dx/xbee'
import { DxFormModal, DxToolbar } from '@dx/xpanda'

import Base from '@components/BasePage/SearchTable/Toolbar'

import ItemForm from '../ItemForm'
import './styles.less'

@inject('actions', 'store')
@observer
export default class PageToolbar extends Base {
  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      showCreateModal: false,
    }
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

  getInputComponent(filter, meta) {
    const store = this.props.store
    const conditions = toJS(store.pageConditions)

    if (meta.type === 'choice') {
      return (
        <Select
          placeholder="请选择"
          value={conditions[filter.name]}
          onChange={this.handleChange.bind(this, filter.name)}
          allowClear
        >
          {
            meta.choices.map(item => {
              return (
                <Select.Option key={item.value} value={item.value}>{item.display_name}</Select.Option>
              )
            })
          }
        </Select>
      )
    }

    return (
      <Input
        value={conditions[filter.name]}
        onChange={this.handleChange.bind(this, filter.name)}
        onPressEnter={this.handleSearch}
        allowClear
        placeholder='请输入'
      />
    )
  }

  render() {
    const { store } = this.props
    const { filters, meta } = store
    const { showCreateModal } = this.state

    return (
      <Fragment>
        <DxToolbar
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          loading={store.loading}
          extra={
            <Button type="primary" onClick={this.handleShowCreateModal}>
              新建
            </Button>
          }
        >
          {
            filters.map(item => {
              return (
                <DxToolbar.Item key={item.name} label={meta[item.name]?.label}>
                  { this.getInputComponent(item, meta[item.name] || {}) }
                </DxToolbar.Item>
              )
            })
          }
        </DxToolbar>

        {showCreateModal ? (
          <DxFormModal
            dxWidthType="min"
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
