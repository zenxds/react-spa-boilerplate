import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"

@inject('homeStore')
@withRouter
@observer
class Home extends Component {
  render() {
    return (
      <div>{ this.props.homeStore.msg }</div>
    )
  }
}

export default Home
