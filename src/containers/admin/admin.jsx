import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { createDeleteUserInfoAction } from '../../redux/action_creators/login_action'
class Admin extends React.Component {
  componentDidMount(){
    console.log(this.props);
  }
  logout=() => {
    this.props.deleteUserInfo()
  }
  render() {
    const{user,isLogin}=this.props.userInfo
    if (!isLogin) {
       return <Redirect to='/login'/>
    }else{
      return(
        <div>
        <div>我是Admin组件,你的名字是:{user.username}</div>
        <button onClick={this.logout}>退出登录</button>
        </div>
      )
    }
  }
}
export default connect(
  state =>({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)(Admin)