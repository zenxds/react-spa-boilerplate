import { createContext, useContext, useCallback, useMemo } from 'react'
import { observable, makeObservable, computed, toJS } from 'mobx'
import { Form } from 'antd'

import type { ReactNode } from 'react'
import type { FormInstance } from 'antd'

import BaseStore from '@/components/BaseStore'

interface DataSourceContextType {
  form?: FormInstance
  store: DataSourceStore
  handleChange: (data: any) => void
  handleSearch: () => void
  handleReset: () => void
}

class DataSourceStore extends BaseStore {
  // 触发获取数据用
  @observable fetchId = 0

  @observable loading = false

  // 查询条件
  @observable conditions = observable.map({})
  @observable pageNo = 1
  @observable pageSize = 10
  @observable total = 0
  @observable dataSource = []

  constructor({ initialConditions }: { initialConditions?: any }) {
    super()

    makeObservable(this)

    if (initialConditions) {
      this.initialConditions = initialConditions
      this.mergeConditions(initialConditions)
    }
  }

  @computed
  get conditionsObject() {
    return Object.fromEntries(toJS(this.conditions))
  }
}

const DataSourceContext = createContext<DataSourceContextType>({
  store: new DataSourceStore({}),
  handleChange: () => {},
  handleSearch: () => {},
  handleReset: () => {},
})

export const useDataSourceStore = () => {
  return useContext(DataSourceContext)
}

export const DataSourceStoreProvider = ({
  children,
  initialConditions,
}: {
  children: ReactNode
  initialConditions: any
}) => {
  const [form] = Form.useForm()
  const store = useMemo(
    () => new DataSourceStore({ initialConditions }),
    [initialConditions],
  )

  const handleSearch = useCallback(() => {
    store.merge({
      fetchId: Date.now(),
    })
  }, [store])

  const handleReset = useCallback(() => {
    store.resetConditions()
    store.merge({
      pageNo: 1,
    })
    form.setFieldsValue(store.conditionsObject)

    handleSearch()
  }, [store, form, handleSearch])

  const handleChange = useCallback(() => {
    store.mergeConditions(form.getFieldsValue())
  }, [form, store])

  return (
    <DataSourceContext.Provider
      value={{ form, store, handleChange, handleSearch, handleReset }}
    >
      {children}
    </DataSourceContext.Provider>
  )
}
