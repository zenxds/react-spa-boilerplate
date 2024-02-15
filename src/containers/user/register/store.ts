import qs from 'qs'
import { createContext, useContext } from 'react'
import { makeObservable, observable, computed } from 'mobx'

import BaseStore from '@/components/BaseStore'
import { paths } from '@/constants'

class LocalStore extends BaseStore {
  @observable disabled = false
  @observable loading = false
  @observable params = qs.parse(location.search, { ignoreQueryPrefix: true })

  constructor() {
    super()
    makeObservable(this)
  }

  @computed
  get loginUrl() {
    if (!this.params.backUrl) {
      return paths.login
    }

    return `${paths.login}?backUrl=${encodeURIComponent(
      this.params.backUrl as string
    )}`
  }

  @computed
  get redirectUrl() {
    return this.params.backUrl || '/'
  }
}

const LocalContext = createContext(new LocalStore())
export const useLocalStore = () => useContext(LocalContext)
