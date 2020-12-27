import myAxios from './myAxios.js'
import {BASE_URL} from '../config/index.js'

//登录请求
export  const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})

//商品分类请求
export const reqCategroyList = () => myAxios.get(`${BASE_URL}/manage/category/list`)
  
