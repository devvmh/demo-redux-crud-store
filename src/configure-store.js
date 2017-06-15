import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import { crudSaga, ApiClient } from 'redux-crud-store'
import rootReducer from './root-reducer.js'

const client = new ApiClient({ basePath: 'https://localhost:4000/' })
const crudMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = compose(
  applyMiddleware(
    crudMiddleware
  )
)(createStore)

const enhancers = compose(
   window.devToolsExtension ? window.devToolsExtension() : f => f
)

// assuming rootReducer and initialState are defined elsewhere
const initialState = undefined

const configureStore = () => {
  const store = createStoreWithMiddleware(rootReducer, initialState, enhancers)
  crudMiddleware.run(crudSaga(client))
  return store
}

export default configureStore
