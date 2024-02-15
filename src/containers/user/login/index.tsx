import { observer } from 'mobx-react'
import { Input, Button, Form } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'

import * as services from '@/services'
import { isUsername, isPassword, isDisabled } from '@/utils'
import { useLocalStore } from './store'

import type { UserLoginDataType } from '@/types'

import '../user.global.less'

const Password = observer(() => {
  const localStore = useLocalStore()
  const [form] = Form.useForm()

  const handleFieldsChange = () => {
    localStore.merge({
      disabled: isDisabled(form),
    })
  }

  const onFinish = async (values: UserLoginDataType) => {
    const { username, password } = values

    localStore.merge({
      loading: true,
    })

    const res = await services.login({
      username,
      password,
    })

    localStore.merge({
      loading: false,
    })

    if (res) {
      location.href = localStore.redirectUrl as string
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
        loading={localStore.loading}
        disabled={localStore.disabled}
      >
        登 录
      </Button>
    </Form>
  )
})

const Extra = observer(() => {
  const localStore = useLocalStore()

  return (
    <div className="more">
      <a href={localStore.registerUrl}>注册账号</a>
    </div>
  )
})

export default function Login() {
  return (
    <div className="center-form">
      <h2 className="center-form-title">用户登录</h2>
      <Password />
      <Extra />
    </div>
  )
}
