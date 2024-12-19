import React from 'react'
import { Input, Button, Form } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { getQueryParams } from '@zenxds/utils'

import * as services from '@/services'
import { isUsername, isPassword, isDisabled } from '@/utils'
import { paths } from '@/constants'

import type { UserLoginDataType } from '@/types'

import '../user.global.less'

const Password = () => {
  const [form] = Form.useForm()
  const [disabled, setDisabled] = React.useState(false)

  const { loading, runAsync: login } = useRequest(
    async (params: UserLoginDataType) => {
      return services.login(params)
    },
  )

  const handleFieldsChange = () => {
    setDisabled(isDisabled(form))
  }

  const onFinish = async (values: UserLoginDataType) => {
    const { username, password } = values

    const res = await login({
      username,
      password,
    })

    if (res) {
      location.href = getQueryParams().get('backUrl') || '/'
    }
  }

  return (
    <Form
      size="large"
      form={form}
      onFinish={onFinish}
      onFieldsChange={handleFieldsChange}
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
        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
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
        <div>
          <Input.Password
            prefix={<LockOutlined />}
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            placeholder="请输入密码"
          />
        </div>
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="submit-btn"
        loading={loading}
        disabled={disabled}
      >
        登 录
      </Button>
    </Form>
  )
}

const Extra = () => {
  const queryParams = getQueryParams()
  const registerUrl = `${paths.register}?backUrl=${encodeURIComponent(
    queryParams.get('backUrl') || '',
  )}`

  return (
    <div className="more">
      <a href={registerUrl}>注册账号</a>
    </div>
  )
}

export default function Login() {
  return (
    <div className="center-form">
      <h2 className="center-form-title">用户登录</h2>
      <Password />
      <Extra />
    </div>
  )
}
