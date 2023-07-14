import BaseActions from '@components/BaseActions'

import store from './store'

class Actions extends BaseActions {
  login(data = {}) {
    return this.post('/user/api/login', data)
  }

  register(data = {}) {
    return this.post('/user/api/register', data)
  }

  chat(data = {}) {
    return this.post('/api/chat', data, {
      catchError: false,
    })
  }

  image(data = {}) {
    return this.post('/api/image', data, {
      catchError: false,
    })
  }
}

export default new Actions(store)
