import { observer } from 'mobx-react'
import { Form, Input } from 'antd'

import type { FormInstance } from 'antd'

interface PropsType {
  data?: any
  form?: FormInstance
}

export default observer(({ data, form }: PropsType) => {
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 19 }}
      form={form}
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
})
