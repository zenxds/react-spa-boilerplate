import { observer } from 'mobx-react'

import PageLayout from '@/components/Layout/Page'
import { DataSourceStoreProvider } from '@/stores'

import Toolbar from './components/Toolbar'
import Table from './components/Table'
import './styles.less'

export default observer(() => {
  return (
    <PageLayout title="首页">
      <DataSourceStoreProvider initialConditions={{ name: 'aaa' }}>
        <Toolbar />
        <Table />
      </DataSourceStoreProvider>
    </PageLayout>
  )
})
