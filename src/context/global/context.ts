import { createContext, useContext } from 'react'

import type { GlobalContextType } from '@/types'

const GlobalContext = createContext<GlobalContextType>({
  isLogin: false,
})

export function getGlobalContext() {
  return GlobalContext
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
