import { Component } from 'react'
import { Alert } from 'antd'

export default WrappedComponent => {
  class ErrorBoundary extends Component {
    constructor(props) {
      super(props)

      this.state = {
        hasError: false
      }
    }

    componentDidCatch(error, info) {
      this.setState({
        hasError: true,
        error,
        info
      })
    }

    render() {
      if (this.state.hasError) {
        return (
          <Alert
            message={<pre>{this.state.error + ''}</pre>}
            type="error"
            showIcon
          />
        )
      }

      return <WrappedComponent {...this.props} />
    }
  }

  return ErrorBoundary
}
