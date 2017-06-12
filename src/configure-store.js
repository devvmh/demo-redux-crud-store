import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import { crudSaga, ApiClient } from 'redux-crud-store'

import rootReducer from './root-reducer.js'

const client = new ApiClient({ basePath: 'http://localhost:4000' })
const crudMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = compose(
  applyMiddleware(
    crudMiddleware
    // add other middlewares here...
  )
)(createStore)

const enhancers = compose(
   window.devToolsExtension ? window.devToolsExtension() : f => f
)

// assuming rootReducer and initialState are defined elsewhere
const initialState = undefined
const store = createStoreWithMiddleware(rootReducer, initialState, enhancers)
crudMiddleware.run(crudSaga(client))

export default store
