import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import actions from './action'

class Page extends Component {

  componentDidMount() {
    this.props.actions.getPageInfo().then((action) => {
      if (action.error) {
        console.log(action.payload)
      }
    })
  }

  render() {
    return (<div>{ this.props.helloMsg }</div>)
  }
}

const mapStateToProps = (state) => {
  return state.page1.toJS()
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page))