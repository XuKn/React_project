import{SAVE_CATE_LIST}from '../action_types.js'

//保存标题
export const createSaveTitleAction =(value) => {
  return {type:SAVE_CATE_LIST,data:value}
}
