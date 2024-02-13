import React from 'react'
import { observer } from 'mobx-react'
import { Button, Input, Form, message } from 'antd'

import SearchFormLayout from '@components/SearchFormLayout'
import FormModal from '@components/FormModal'
import { useModal } from '@hooks'
import { useDataSourceStore } from '@stores'
import * as services from '@services'

import ItemForm from '../ItemForm'
import './styles.less'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export default observer(() => {
  const { store, form, handleSearch, handleReset, handleChange } =
    useDataSourceStore()
  const createModal = useModal(false)

  const handleCreateSuccess = React.useCallback(() => {
    message.success('新建成功')

    handleReset()
    createModal.handleClose()
  }, [handleReset, createModal])

  return (
    <>
      <div className="page-header">
        <Form
          // {...formItemLayout}
          form={form}
          onValuesChange={handleChange}
          initialValues={store.conditionsObject}
        >
          <SearchFormLayout
            handleSearch={handleSearch}
            handleReset={handleReset}
          >
            <Form.Item label="关键字" name="name">
              <Input />
            </Form.Item>
          </SearchFormLayout>
        </Form>

        <div className="page-header-actions">
          <Button type="primary" onClick={createModal.handleOpen}>
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
})
