import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from './root-reducer.js'

const createStoreWithMiddleware = compose(
  applyMiddleware(
  )
)(createStore)

const enhancers = compose(
   window.devToolsExtension ? window.devToolsExtension() : f => f
)

// assuming rootReducer and initialState are defined elsewhere
const initialState = undefined

const configureStore = () => {
  return createStoreWithMiddleware(rootReducer, initialState, enhancers)
}

export default configureStore
