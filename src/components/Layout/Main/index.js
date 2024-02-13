import React from 'react'

import './styles.less'

export default ({ title, children }) => {
  return (
    <div styleName="layout">
      <div styleName="header">
        <h2>{title}</h2>
      </div>
      <div styleName="wrapper">
        <div styleName="content">{children}</div>
      </div>
    </div>
  )
}
