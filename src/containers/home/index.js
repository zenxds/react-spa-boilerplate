import { observer } from 'mobx-react'

import LayoutMain from '@components/Layout/Main'

import { LocalContextProvider } from './context'
import Toolbar from './components/Toolbar'
import Table from './components/Table'
import './styles.less'

export default observer(() => {
  return (
    <LayoutMain title="首页">
      <LocalContextProvider>
        <Toolbar />
        <Table />
      </LocalContextProvider>
    </LayoutMain>
  )
})
