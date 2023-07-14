import { createContext, useContext } from 'react'
import { makeAutoObservable } from 'mobx'

import paths from '@constants/paths'
import { unparam } from '@utils'

class LocalStore {
  disabled = false
  loading = false
  params = unparam(location.search.slice(1))

  constructor() {
    makeAutoObservable(this)
  }

  get loginUrl() {
    if (!this.params.backUrl) {
      return paths.login
    }

    return `${paths.login}?backUrl=${encodeURIComponent(
      this.params.backUrl,
    )}`
  }

  get redirectUrl() {
    return this.params.backUrl || '/'
  }

  merge(obj = {}) {
    Object.assign(this, obj)
  }
}

const LocalContext = createContext(new LocalStore())
export const useLocalStore = () => useContext(LocalContext)
