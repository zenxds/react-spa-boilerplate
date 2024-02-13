import React from 'react'
import { observer } from 'mobx-react'
import { Input, Button, Form } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
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

    const res = await services.register({
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
        styleName="submit"
        loading={localStore.loading}
        disabled={localStore.disabled}
      >
        注 册
      </Button>
    </Form>
  )
})

const Extra = observer(() => {
  const localStore = useLocalStore()

  return (
    <div styleName="more">
      <Link styleName="link" to={localStore.loginUrl}>
        登录已有账号
      </Link>
    </div>
  )
})

export default () => {
  return (
    <div styleName="form">
      <h2 styleName="form-title">用户注册</h2>
      <Password />
      <Extra />
    </div>
  )
}
