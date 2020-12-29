import myAxios from './myAxios.js'
import {BASE_URL} from '../config/index.js'

//登录请求
export  const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})

//商品分类请求
export const reqCategoryList = () => myAxios.get(`${BASE_URL}/manage/category/list`)

//新增商品分类
export const reqAddCategory = ({categoryName}) => myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})
//更改商品分类
export const reqUpdateCategory = ({categoryId,categoryName}) => myAxios.post(`${BASE_URL}/manage/category/update`,{categoryId,categoryName})
  
