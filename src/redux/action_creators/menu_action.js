import{SAVE_TITLE}from '../action_types.js'

//保存标题
export const createSaveTitleAction =(value) => {
  return {type:SAVE_TITLE,data:value}
}
