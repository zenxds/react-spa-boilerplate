import { Form } from 'antd'
import { AntdTableContextProvider } from '@zenxds/utils'

import PageLayout from '@/components/Layout/Page'
import * as services from '@/services'

import Toolbar from './components/Toolbar'
import Table from './components/Table'
import './styles.module.less'

export default () => {
  const [form] = Form.useForm()

  return (
    <PageLayout title="首页">
      <AntdTableContextProvider
        service={async ({ current, pageSize }, formData) => {
          const res = await services.getHomeList({
            pageNo: current,
            pageSize,
            ...formData,
          })
          return {
            list: res?.items || [],
            total: res?.total || 0,
          }
        }}
        options={{
          form,
          defaultPageSize: 10,
        }}
      >
        <Toolbar />
        <Table />
      </AntdTableContextProvider>
    </PageLayout>
  )
}
