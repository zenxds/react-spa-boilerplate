import { createContext, useContext } from 'react'
import type { ReactElement } from 'react'

import userStore from './user'
import menuStore from './menu'

const StoreContext = createContext({
  userStore,
  menuStore,
})

export const useGlobalStores = () => useContext(StoreContext)

export const GlobalStoreProvider = ({
  children,
}: {
  children: ReactElement
}) => {
  return (
    <StoreContext.Provider value={{ userStore, menuStore }}>
      {children}
    </StoreContext.Provider>
  )
}

export * from './dataSource'
