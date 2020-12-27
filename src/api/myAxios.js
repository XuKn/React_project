import { message } from 'antd'
import axios from 'axios'
import qs from 'querystring'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../redux/store.js'
import {createDeleteUserInfoAction} from '../redux/action_creators/login_action.js'
const instance = axios.create({
  timeout:4000
})
//请求拦截器
instance.interceptors.request.use(function (config) {
   Nprogress.start()
   //token验证
   const{token}=store.getState().userInfo
   if (token) {
     config.headers.Authorization='init_'+token
   }
  const{method,data} = config
  if (method ==='post' ) {
    if (data instanceof Object) {
      config.data = qs.stringify(data)
    }
  }
  return config
})
//响应拦截器
instance.interceptors.response.use(
  (response) => {
    Nprogress.done()
    return response.data
  },
  (error) => {
    Nprogress.done()
    if (error.response.status===401) {
      message.warning('身份验证失败,请重新登录',1)
      store.dispatch(createDeleteUserInfoAction())
    }else{
      message.warning(error.message,1)
    }
    return new Promise (() => {})
  }
)
export default instance