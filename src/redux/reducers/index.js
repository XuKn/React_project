import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menuReducer from './menu_reducer'
//创建连接多个ruducer
export default combineReducers({
  userInfo : loginReducer,
  menuTitle : menuReducer
})
