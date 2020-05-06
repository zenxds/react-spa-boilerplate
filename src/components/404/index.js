import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'

import paths from '@constants/paths'
import './index.less'

@withRouter
export default class Component extends React.Component {
  handleBack = () => {
    this.props.history.push(paths.index)
  }

  render() {
    return (
      <div styleName="content">
        <div styleName="icon" />
        <div styleName="info">
          <h2>404</h2>
          <div styleName="tip">抱歉，您访问的页面不存在</div>
          <Button type="primary" onClick={this.handleBack}>
            返回首页
          </Button>
        </div>
      </div>
    )
  }
}
