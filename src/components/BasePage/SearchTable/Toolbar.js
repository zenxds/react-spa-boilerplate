import { Component } from 'react'
import { message } from 'antd'

export default class Toolbar extends Component {
  handleChange = (type, event) => {
    const target = event?.target
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

  handleReset = () => {
    this.props.actions.resetConditions()
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
}
