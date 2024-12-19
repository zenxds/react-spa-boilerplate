import React from 'react'
import { Button, Input, Form, message } from 'antd'
import { useAntdTableContext } from '@zenxds/utils'

import SearchFormLayout from '@/components/SearchFormLayout'
import FormModal from '@/components/FormModal'
import { useModal } from '@/hooks'
import * as services from '@/services'

import ItemForm from '../ItemForm'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export default () => {
  const { form, search } = useAntdTableContext()
  const createModal = useModal(false)

  const handleCreateSuccess = () => {
    message.success('新建成功')

    search?.reset()
    createModal.handleClose()
  }

  return (
    <>
      <div className="page-header">
        <Form
          // {...formItemLayout}
          form={form}
        >
          <SearchFormLayout
            handleSearch={() => {
              search?.submit()
            }}
            handleReset={() => {
              search?.reset()
            }}
          >
            <Form.Item label="关键字" name="name">
              <Input />
            </Form.Item>
          </SearchFormLayout>
        </Form>

        <div className="page-header-actions">
          <Button
            type="primary"
            onClick={() => {
              createModal.handleOpen()
            }}
          >
            新建
          </Button>
        </div>
      </div>

      {createModal.open ? (
        <FormModal
          title="新建"
          width={600}
          service={services.createHomeItem}
          onSuccess={handleCreateSuccess}
          onCancel={createModal.handleClose}
        >
          <ItemForm />
        </FormModal>
      ) : null}
    </>
  )
}
