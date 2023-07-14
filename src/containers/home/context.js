import { createContext } from 'react'
import { Provider } from 'mobx-react'

import actions from './actions'
import store from './store'

export default createContext({
  actions,
  store,
})

export const ContextProvider = ({ children }) => {
  return (
    <Provider store={store} actions={actions}>
      {children}
    </Provider>
  )
}
