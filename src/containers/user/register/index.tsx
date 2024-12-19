import React from 'react'
import { Input, Button, Form } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { getQueryParams } from '@zenxds/utils'

import * as services from '@/services'
import { isUsername, isPassword, isDisabled } from '@/utils/validator'
import { paths } from '@/constants'

import type { UserRegisterDataType } from '@/types'
import '../user.global.less'

const Password = () => {
  const [form] = Form.useForm()
  const [disabled, setDisabled] = React.useState(false)

  const { loading, runAsync: register } = useRequest(
    async (params: UserRegisterDataType) => {
      return services.register(params)
    },
  )

  const handleFieldsChange = () => {
    setDisabled(isDisabled(form))
  }

  const onFinish = async (values: UserRegisterDataType) => {
    const { username, password } = values

    const res = await register({
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
        <Input.Password
          prefix={<LockOutlined />}
          iconRender={visible =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          placeholder="请设置密码"
        />
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
        <Input.Password
          prefix={<LockOutlined />}
          iconRender={visible =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          placeholder="请确认密码"
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="submit-btn"
        loading={loading}
        disabled={disabled}
      >
        注 册
      </Button>
    </Form>
  )
}

const Extra = () => {
  const queryParams = getQueryParams()
  const loginUrl = `${paths.login}?backUrl=${encodeURIComponent(
    queryParams.get('backUrl') || '',
  )}`

  return (
    <div className="more">
      <a href={loginUrl}>登录已有账号</a>
    </div>
  )
}

export default function Register() {
  return (
    <div className="center-form">
      <h2 className="center-form-title">用户注册</h2>
      <Password />
      <Extra />
    </div>
  )
}
