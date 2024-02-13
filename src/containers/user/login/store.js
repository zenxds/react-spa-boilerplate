import { createContext, useContext } from 'react'
import { makeObservable, observable, computed } from 'mobx'

import BaseStore from '@components/BaseStore'
import paths from '@constants/paths'
import { unparam } from '@utils'

class LocalStore extends BaseStore {
  @observable disabled = false
  @observable loading = false
  @observable params = unparam(location.search.slice(1))

  constructor() {
    super()
    makeObservable(this)
  }

  @computed
  get registerUrl() {
    if (!this.params.backUrl) {
      return paths.register
    }

    return `${paths.register}?backUrl=${encodeURIComponent(
      this.params.backUrl,
    )}`
  }

  @computed
  get redirectUrl() {
    return this.params.backUrl || '/'
  }
}

const LocalContext = createContext(new LocalStore())
export const useLocalStore = () => useContext(LocalContext)
