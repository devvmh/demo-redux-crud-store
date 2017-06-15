import { combineReducers } from 'redux'
import { crudReducer } from 'redux-crud-store'

const rootReducer = combineReducers({
  models: crudReducer
})

export default rootReducer
