import { Component, cloneElement, createRef } from 'react'
import { Modal } from 'antd'
import { observer } from 'mobx-react'

@observer
export default class FormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
    this.formRef = createRef()
  }

  handleOk = async () => {
    const { action, onSuccess, processor, validator } = this.props
    let values = await this.formRef.current.validateFields()

    if (validator) {
      const validated = validator(values)
      if (!validated) {
        return
      }
    }

    if (processor) {
      values = processor(values)
    }

    this.setState({
      loading: true
    })

    const res = await action(values)

    this.setState({
      loading: false
    })

    if (res) {
      if (onSuccess) {
        onSuccess(res, values)
      }
    }
  }

  render() {
    const { loading } = this.state
    const { children } = this.props

    return (
      <Modal
        open={true}
        confirmLoading={loading}
        destroyOnClose={true}
        onOk={this.handleOk}
        {...this.props}
      >
        {cloneElement(children, {
          formRef: this.formRef
        })}
      </Modal>
    )
  }
}
