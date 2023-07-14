import loadable from '@loadable/component'
import { Spin } from 'antd'

export default function load(page) {
  const Com = loadable(() => import(`./containers/${page}`), {
    fallback: (
      <div className="page-loading">
        <Spin />
      </div>
    ),
  })

  return <Com />
}
