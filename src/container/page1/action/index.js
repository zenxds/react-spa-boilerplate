import { createActions } from 'redux-actions'
import * as apis from '../constant/api'
import request from '../../../util/request'

const actions = {}

// page1 for namespace
actions.page1 = {
  getPageInfo: () => {
    return request(apis.pageInfo)
  }
}

export default createActions(actions).page1