import { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'

const DataSourceContext = createContext({})

export const useDataSourceContext = () => {
  return useContext(DataSourceContext)
}

export const DataSourceProvider = ({ children }) => {
  const store = useLocalObservable({
    fetchId: 0,
    loading: true,

    pageNo: 1,
    pageSize: 10,
    total: 0,
    dataSource: [],

    merge(obj) {
      Object.assign(this, obj)
    },
  })

  return (
    <DataSourceContext.Provider value={store}>
      {children}
    </DataSourceContext.Provider>
  )
}
