import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from "mobx-react"
import homeStore from './store'

@observer
class Page extends Component {
  render() {
    return (
      <div>{ homeStore.msg }</div>
    )
  }
}

export default withRouter(Page)
