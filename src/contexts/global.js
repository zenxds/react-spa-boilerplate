import { createContext, useContext } from 'react'

import userStore from '@stores/user'
import menuStore from '@components/Menu/store'

import userActions from '@components/User/actions'

const GlobalContext = createContext({})

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalContextProvider = ({ children }) => {
  const store = {
    userStore,
    menuStore,

    userActions,
  }
  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  )
}
