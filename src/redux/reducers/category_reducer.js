import {SAVE_CATE_LIST} from '../action_types.js'

//初始化状态
let initState =[];
export default function test(preState=initState,action) {
  const {type,data} =action
  let newState
  switch (type) {
    case SAVE_CATE_LIST:
      newState = [...data]
      return newState
      default:
      return preState
    }
}