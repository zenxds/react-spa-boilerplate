import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

import { MenuContextProvider } from '@/context'
import Header from '@/components/Header'
import Menu from '@/components/Menu'

export default function Main() {
  return (
    <Layout>
      <Layout.Sider className="app-menu" breakpoint="xs" collapsedWidth={80}>
        <MenuContextProvider>
          <Menu />
        </MenuContextProvider>
      </Layout.Sider>
      <Layout>
        <Layout.Header className="app-header">
          <Header />
        </Layout.Header>
        <Layout.Content className="app-content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
