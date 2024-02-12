import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Row, Col, Input, Form } from 'antd'

import FormModal from '@components/FormModal'
import { useLocalContext } from '../../context'
// import Base from '@components/BasePage/SearchTable/Toolbar'

import ItemForm from '../ItemForm'
import './styles.less'

export default observer(() => {
  const { store } = useLocalContext()
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <>
      <div className="page-header">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={24} md={8}>
            <Form.Item
              label={screen.width < 576 ? '' : '名称'}
              labelCol={{ xs: 4, md: 6 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <div className="header-btns">
          <Button
            type="primary"
            // onClick={this.handleSearch}
          >
            查询
          </Button>
          <Button
            type="primary"
            // onClick={this.handleShowCreateModal}
          >
            新建
          </Button>
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
