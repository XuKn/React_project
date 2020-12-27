import React from 'react'
import {connect} from 'react-redux'
import './css/login.less'
import image from '../../static/images/login.png'
import NormalLoginForm from './LoginForm'
import {Redirect} from 'react-router-dom'
class Login extends React.Component {
  render() {
    const { isLogin } = this.props;
    //如果已经登录了，重定向到admin页面
    if (isLogin) {
      return <Redirect to="/admin" />
    }
    return (
      <div className='login'>
        <header>
          <img src={image} alt="login" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <NormalLoginForm />
        </section>
      </div>
    )
  }
}

export default connect(
   state =>{
     return{
      isLogin:state.userInfo.isLogin
     }
   },
  {
  }
)(Login)