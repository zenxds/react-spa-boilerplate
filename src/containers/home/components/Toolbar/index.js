import React, { useState, useCallback, useEffect } from 'react'
import { autorun, observable } from 'mobx'
import { observer } from 'mobx-react'
import { Button, Row, Col, Input, Form } from 'antd'

import FormModal from '@components/FormModal'
import { useSearch } from '@hooks'
import { useDataSourceStore } from '@stores'
// import Base from '@components/BasePage/SearchTable/Toolbar'

import ItemForm from '../ItemForm'
import './styles.less'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

export default observer(() => {
  const store = useDataSourceStore()
  const { handleSearch, handleReset } = useSearch(store)
  const [form] = Form.useForm()
  const handleChange = React.useCallback(() => {
    store.mergeConditions(form.getFieldsValue())
  }, [form, store])
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <>
      <div className="page-header">
        <Form
          {...formItemLayout}
          form={form}
          onValuesChange={handleChange}
          initialValues={store.conditionsObject}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} md={8}>
              <Form.Item label={screen.width < 576 ? '' : '名称'} name="name">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="header-btns">
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </div>
      </div>

      {showCreateModal ? (
        <FormModal
          title="新建"
          width={600}
          // action={actions.createItem}
          // processor={this.handleValues}
          // onSuccess={this.handleCreateSuccess}
          // onCancel={this.handleHideCreateModal}
        >
          <ItemForm />
        </FormModal>
      ) : null}
    </>
  )
})
