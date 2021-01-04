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
//获取商品分页列表
export const reqProductList = (pageNum,pageSize) => myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})
//更改商品状态
export const reqUpdateState = (productId,status) => myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{productId,status})
//搜索分类
export const reqSearch = (pageNum,pageSize,searchType,keyWord) => myAxios.get(`${BASE_URL}/manage/product/search`,{params:{pageNum,pageSize,[searchType]:keyWord}})

//根据id获取商品信息
export const reqProdById = (productId) => myAxios.get(`${BASE_URL}/manage/product/info`,{params:{productId}})
//删除图片请求
export const reqDeletePicture = (name) => myAxios.post(`${BASE_URL}/manage/img/delete`,{name})
//添加商品
export const reqAddProduct = (productobj) => myAxios.post(`${BASE_URL}/manage/product/add`,{...productobj})
//更新商品
export const reqUpdateProduct = (productobj) => myAxios.post(`${BASE_URL}/manage/product/update`,{...productobj})
//获取角色列表
export const reqRoleList = () => myAxios.get(`${BASE_URL}/manage/role/list`)
//添加角色
export const reqAddRole = (roleName) => myAxios.post(`${BASE_URL}/manage/role/add`,{roleName})
//更新角色
export const reqUpdateRole = (roleobj) => myAxios.post(`${BASE_URL}/manage/role/update`,{...roleobj,auth_time:Date.now()})
//获取所有用户列表
export const reqUserList = () => myAxios.get(`${BASE_URL}/manage/user/list`)
//新增用户
export const reqAddUser = (userobj) => myAxios.post(`${BASE_URL}/manage/user/add`,{...userobj})
//更新用户
export const reqUpdateUser = (userobj) => myAxios.post(`${BASE_URL}/manage/user/update`,{...userobj})
//删除用户
export const reqDeleUser = (userId) => myAxios.post(`${BASE_URL}/manage/user/delete`,{userId})