import { createActions } from 'redux-actions'
import * as apis from '../constant/api'
import request from '../../../util/request'

const actions = {}

// page2 for namespace
actions.page2 = {
  getPageInfo: () => {
    return request(apis.pageInfo)
  }
}

export default createActions(actions).page2