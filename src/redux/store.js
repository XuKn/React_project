import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userInfo from './reducers/index.js'
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(userInfo,composeWithDevTools(applyMiddleware(thunk)))