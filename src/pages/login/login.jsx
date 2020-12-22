import React from 'react'
import './login.less'
import image from './imgs/login.png'
import Form from './Form/Form.jsx'

export default class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <header>
          <img src={image} alt="login" />
          <h1>商品管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form/>
        </section>
      </div>
    )
  }
}