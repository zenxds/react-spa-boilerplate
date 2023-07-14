import { observer, inject } from 'mobx-react'
import { Form, Input } from 'antd'

import BaseForm from '@components/BasePage/form'

@inject('store', 'actions')
@observer
export default class ItemForm extends BaseForm {
  constructor(props) {
    super(props)

    this.state = {
      type: props.data ? props.data.type : '',
    }
  }

  render() {
    const { formRef, data, store } = this.props

    return (
      <Form
        ref={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        initialValues={data}
      >
        {data?.id ? (
          <Form.Item label="ID" style={{ display: 'none' }} name="id">
            <Input type="hidden" />
          </Form.Item>
        ) : null}

        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
      </Form>
    )
  }
}
