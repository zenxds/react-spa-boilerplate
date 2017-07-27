import { combineReducers } from 'redux'

import page1 from '../container/page1/reducer'
import page2 from '../container/page2/reducer'

export default combineReducers({
  page1,
  page2
})