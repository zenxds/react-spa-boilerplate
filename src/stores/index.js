import { createContext, useContext } from 'react'
import { Provider } from 'mobx-react'

import userStore from '@components/User/store'
import menuStore from '@components/Menu/store'

import userActions from '@components/User/actions'

const StoreContext = createContext({
  userStore,
  menuStore,
})

const ActionsContext = createContext({
  userActions,
})

export const useStores = () => useContext(StoreContext)
export const useActions = () => useContext(ActionsContext)

export const StoreProvider = ({ children }) => {
  const store = {
    userStore,
    menuStore,

    userActions,
  }
  return <Provider {...store}>{children}</Provider>
}
