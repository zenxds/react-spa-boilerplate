import React, { Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Row, Col, Input, Form } from 'antd'

import FormModal from '@components/FormModal'
import Base from '@components/BasePage/SearchTable/Toolbar'

import ItemForm from '../ItemForm'
import './styles.less'

@inject('store', 'actions')
@observer
export default class PageToolbar extends Base {
  constructor(props) {
    super(props)

    this.state = {
      showCreateModal: false,
    }
  }

  render() {
    const { showCreateModal } = this.state
    const { actions } = this.props

    return (
      <Fragment>
        <div className="page-header">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={24} md={8}>
              <Form.Item
                label={screen.width < 576 ? '' : '名称' }
                labelCol={{ xs: 4, md: 6 }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <div className="header-btns">
            <Button type="primary" onClick={this.handleSearch}>
              查询
            </Button>
            <Button type="primary" onClick={this.handleShowCreateModal}>
              新建
            </Button>
          </div>
        </div>

        {showCreateModal ? (
          <FormModal
            title="新建"
            width={600}
            action={actions.createItem}
            processor={this.handleValues}
            onSuccess={this.handleCreateSuccess}
            onCancel={this.handleHideCreateModal}
          >
            <ItemForm />
          </FormModal>
        ) : null}
      </Fragment>
    )
  }
}
