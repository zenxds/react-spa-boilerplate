import React, { Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from 'antd'

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
    const { actions } = this.props
    const { showCreateModal } = this.state

    return (
      <Fragment>
        <div styleName="header">
          <div className="header-btns">
            {
              // <Button type="primary" onClick={this.handleSearch}>
              //   查询
              // </Button>
            }
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
