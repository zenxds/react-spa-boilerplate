import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Input, Select } from '@dx/xbee'

@inject('actions', 'store')
@observer
export default class ItemForm extends Component {
  constructor(props) {
    super(props)
  }

  getInputComponent(info) {
    const msg = `请${info.type === 'choice' ? '选择' : '输入'}${info.label}`

    if (info.type === 'choice') {
      return (
        <Select placeholder={msg} disable={!!info.read_only}>
          {
            info.choices.map(item => {
              return (
                <Select.Option key={item.value} value={item.value}>{item.display_name}</Select.Option>
              )
            })
          }
        </Select>
      )
    }

    return (
      <Input placeholder={msg} disable={!!info.read_only} />
    )
  }

  render() {
    const { form, data } = this.props
    const { meta } = this.props.store
    const columns = Object.keys(meta).filter(key => key !== 'id')

    return (
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        initialValues={data}
      >
        {data && data.id ? (
          <Form.Item label="ID" style={{ display: 'none' }} name="id">
            <Input type="hidden" />
          </Form.Item>
        ) : null}

        {
          columns.map(key => {
            const info = meta[key]
            return (
              <Form.Item
                key={key}
                label={info.label}
                name={key}
                rules={[
                  {
                    required: info.required,
                    message: `请${info.type === 'choice' ? '选择' : '输入'}${info.label}`,
                  },
                ]}
              >
                {this.getInputComponent(info)}
              </Form.Item>
            )
          })
        }
      </Form>
    )
  }
}
