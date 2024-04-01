import { createContext, useContext } from 'react'
import type { ReactElement } from 'react'

// import userStore from './user'
// import menuStore from './menu'

const StoreContext = createContext({
  userStore: {
    isLogin: false,
  },
})

export const useGlobalStores = () => useContext(StoreContext)

export const GlobalStoreProvider = ({
  children,
}: {
  children: ReactElement
}) => {
  return (
    <StoreContext.Provider
      value={{
        userStore: {
          isLogin: true,
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
