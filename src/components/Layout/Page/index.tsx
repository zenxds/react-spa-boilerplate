import React from 'react'

import './styles.module.less'

interface PropsType {
  title: string
  children: React.ReactNode
}

export default function Page({ title, children }: PropsType) {
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
