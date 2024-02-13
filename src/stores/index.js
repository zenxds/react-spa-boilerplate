import { createContext, useContext } from 'react'

import userStore from './user'
import menuStore from './menu'

const StoreContext = createContext()

export const useGlobalStores = () => useContext(StoreContext)

export const GlobalStoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ userStore, menuStore }}>
      {children}
    </StoreContext.Provider>
  )
}

export * from './dataSource'
