import{SAVE_PROD_LIST}from '../action_types.js'

//保存分页信息
export const createSaveProdAction =(value) => {
  return {type:SAVE_PROD_LIST,data:value}
}
