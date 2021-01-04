import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menuReducer from './menu_reducer'
import productRecuder from './product_reducer'
import categoryRecuder from './category_reducer'
//创建连接多个ruducer
export default combineReducers({
  userInfo : loginReducer,
  menuTitle : menuReducer,
  productList : productRecuder,
  categoryList : categoryRecuder
})
