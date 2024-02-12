import { createContext, useContext } from 'react'

import userStore from './user'
import menuStore from './menu'

const StoreContext = createContext()

export const useStores = () => useContext(StoreContext)

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ userStore, menuStore }}>
      {children}
    </StoreContext.Provider>
  )
}
