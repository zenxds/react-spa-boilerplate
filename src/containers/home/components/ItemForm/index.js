import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Input } from 'antd'

@observer
export default class ItemForm extends Component {
  render() {
    const { formRef, data } = this.props

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
