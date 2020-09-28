import { Component } from 'react'
import { Form, Input } from '@dx/xbee'

@Form.create()
export default class ItemForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { form, data } = this.props
    const { getFieldDecorator } = form

    return (
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}>
        {data && data.id
          ? getFieldDecorator('id', {
              initialValue: data.id,
            })(<Input type="hidden" />)
          : null}

        <Form.Item label="名称">
          {getFieldDecorator('name', {
            initialValue: data ? data.name : '',
            rules: [
              {
                required: true,
                message: '请输入名称',
              },
            ],
          })(<Input placeholder="请输入名称" />)}
        </Form.Item>
      </Form>
    )
  }
}
