import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import actions from './action'

class Page extends Component {

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.{{ name }}.toJS()
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page))