import React, { useMemo } from 'react'

import { getGlobalContext } from './index'

import type { GlobalContextType } from '@/types'

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const GlobalContext = getGlobalContext()

  const contextValue: GlobalContextType = useMemo(() => {
    return {
      isLogin: !!window.user,
      user: window.user ? JSON.parse(window.user) : {},
    }
  }, [])

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}
