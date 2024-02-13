import { useCallback } from 'react'

export function useSearch(store) {
  const handleSearch = useCallback(() => {
    store.merge({
      fetchId: Date.now(),
    })
  }, [store])

  const handleReset = useCallback(() => {
    store.resetConditions()

    store.merge({
      fetchId: Date.now(),
    })
  }, [store])

  return {
    handleSearch,
    handleReset,
  }
}
