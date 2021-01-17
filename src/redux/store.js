// 引入createStore创建store，引入applyMiddleware 来使用中间件
import {createStore,applyMiddleware} from 'redux'
//异步操作
import thunk from 'redux-thunk'
import userInfo from './reducers/index.js'
// 安装redux-devtools-extension的可视化工具
import {composeWithDevTools} from 'redux-devtools-extension'



export default createStore(userInfo,composeWithDevTools(applyMiddleware(thunk)))