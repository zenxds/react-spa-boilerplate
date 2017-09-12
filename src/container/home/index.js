import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from "mobx-react"
import { observable, action } from "mobx"

import * as actions from './action'

@observer
class Page extends Component {
  @observable msg = ''

  componentDidMount() {
    actions.getHomeInfo().then(data => {
      this.setMsg(data.helloMsg)
    })
  }

  @action
  setMsg(msg) {
    this.msg = msg
  }

  render() {
    return (
      <div>{ this.msg }</div>
    )
  }
}

export default withRouter(Page)
