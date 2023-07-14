import { useRouteError, Link } from 'react-router-dom'
import { Result } from 'antd'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <Result
      status="error"
      title="Sorry, an unexpected error has occurred."
      subTitle={error.statusText || error.message}
      extra={<Link to="/">Back Home</Link>}
    />
  )
}

export function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/">Back Home</Link>}
    />
  )
}
