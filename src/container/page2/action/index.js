import { createActions } from 'redux-actions'
import * as apis from '../constant/api'
import request from '../../../util/request'

const actions = createActions({
  getPageInfo: () => {
    return request(apis.pageInfo)
  }
})

export default actions