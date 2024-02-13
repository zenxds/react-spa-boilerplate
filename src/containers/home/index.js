import { observer } from 'mobx-react'

import LayoutMain from '@components/Layout/Main'

import { DataSourceStoreProvider } from '@stores'
import Toolbar from './components/Toolbar'
import Table from './components/Table'
import './styles.less'

export default observer(() => {
  return (
    <LayoutMain title="首页">
      <DataSourceStoreProvider initialConditions={{ name: 'aaa' }}>
        <Toolbar />
        <Table />
      </DataSourceStoreProvider>
    </LayoutMain>
  )
})
