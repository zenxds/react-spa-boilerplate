import React from 'react'
import { observer } from 'mobx-react'
import { Input, Button, Form } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import * as services from '@services'
import { isUsername, isPassword, isDisabled } from '@utils/validator'
import { useLocalStore } from './store'
import '../common.less'
import './styles.less'

const Password = observer(() => {
  const localStore = useLocalStore()
  const [form] = Form.useForm()

  const handleFieldsChange = () => {
    localStore.merge({
      disabled: isDisabled(form),
    })
  }

  const onFinish = async values => {
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
      location.href = localStore.redirectUrl
    }
  }

  return (
    <Form form={form} onFinish={onFinish} onFieldsChange={handleFieldsChange}>
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
        styleName="submit"
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
    <div styleName="more">
      <Link styleName="link" to={localStore.registerUrl}>
        注册账号
      </Link>
    </div>
  )
})

export default () => {
  return (
    <div styleName="form">
      <h2 styleName="form-title">用户登录</h2>
      <Password />
      <Extra />
    </div>
  )
}
