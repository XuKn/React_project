import{SAVE_USER_INFO,DELETE_USER_INFO}from '../action_types.js'

//保存用户信息action
export const createSaveUserInfoAction =(value) => {
  localStorage.setItem('user',JSON.stringify(value.user))
  localStorage.setItem('token',value.token)
  return {type:SAVE_USER_INFO,data:value}
}
//删除用户信息action
export const createDeleteUserInfoAction =(value) => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type:DELETE_USER_INFO}
}