import { observer } from 'mobx-react'

import LayoutMain from '@components/Layout/Main'

import { ContextProvider } from './context'
import Toolbar from './components/Toolbar'
import Table from './components/Table'
import './styles.less'

export default observer(() => {
  return (
    <LayoutMain title="页面标题">
      <ContextProvider>
        <Toolbar />
        <Table />
      </ContextProvider>
    </LayoutMain>
  )
})
