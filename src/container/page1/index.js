import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import actions from './action'

class Page extends Component {
  render() {
    return (<div>{ this.props.helloMsg }</div>)
  }

  componentDidMount() {
    this.props.actions.getPageInfo().catch((e) => {
      console.log(e)
    })
  }
}

const mapStateToProps = (state) => {
  return state.page1
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page))