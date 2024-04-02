import { useCallback, useState } from 'react'
import { Form, Button, Input, Toast } from 'antd-mobile'

import * as services from '@/services'
import { isUsername, isPassword, isDisabled } from '@/utils'

import '../styles.module.less'

export default function Login() {
  const [form] = Form.useForm()
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    const values = await form.validateFields()

    setLoading(true)

    const res = await services.register({
      username: values.username,
      password: values.password,
    })

    if (res) {
      Toast.show({
        content: '注册成功',
      })
      // 跳转
    }

    setLoading(false)
  }, [form])

  const handleFieldsChange = useCallback(() => {
    setDisabled(isDisabled(form))
  }, [form])

  return (
    <div styleName="form">
      <Form
        layout="horizontal"
        mode="card"
        form={form}
        onFieldsChange={handleFieldsChange}
        footer={
          <Button
            block
            color="primary"
            className="submit-btn"
            onClick={onSubmit}
            loading={loading}
            disabled={disabled}
          >
            登 录
          </Button>
        }
      >
        <Form.Item
          name="username"
          rules={[
            {
              validator: async (rule, value) => {
                if (value && !isUsername(value)) {
                  return Promise.reject(new Error('请输入正确格式的用户名'))
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              validator: async (rule, value) => {
                if (value && !isPassword(value)) {
                  return Promise.reject(new Error('请输入正确格式的密码'))
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="password2"
          rules={[
            {
              validator: async (rule, value) => {
                if (value) {
                  const password = form.getFieldValue('password')
                  if (value !== password) {
                    return Promise.reject(new Error('两次输入的密码不一致'))
                  }
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          <Input type="password" placeholder="请确认密码" />
        </Form.Item>
      </Form>
    </div>
  )
}
