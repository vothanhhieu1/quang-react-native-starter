import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import reducers from './reducers'

const sagaMiddleWare = createSagaMiddleware()
export const store = createStore(reducers, applyMiddleware(sagaMiddleWare))
sagaMiddleWare.run(sagas)
