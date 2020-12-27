import {SAVE_TITLE} from '../action_types.js'

//初始化状态
let initState = '';
export default function test(preState=initState,action) {
  const {type,data} =action
  let newState
  switch (type) {
    case SAVE_TITLE:
      newState = data
      return newState
      default:
      return preState
    }
}