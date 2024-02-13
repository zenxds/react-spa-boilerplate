import { createContext, useContext } from 'react'
import { observable, makeObservable, computed, toJS } from 'mobx'

import BaseStore from '@components/BaseStore'

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

  constructor({ initialConditions }) {
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

const DataSourceContext = createContext({})

export const useDataSourceStore = () => {
  return useContext(DataSourceContext)
}

export const DataSourceStoreProvider = ({ children, initialConditions }) => {
  const store = new DataSourceStore({ initialConditions })

  return (
    <DataSourceContext.Provider value={store}>
      {children}
    </DataSourceContext.Provider>
  )
}
