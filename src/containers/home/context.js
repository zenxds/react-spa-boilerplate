import { createContext, useContext } from 'react'

import store from './store'

const LocalContext = createContext({
  store,
})

export const useLocalContext = () => useContext(LocalContext)

export const LocalContextProvider = ({ children }) => {
  return (
    <LocalContext.Provider value={{ store }}>{children}</LocalContext.Provider>
  )
}
