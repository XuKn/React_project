import React from 'react'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'

 class NormalLoginForm extends React.Component{
   render(){
    const onFinish = async(values) => {
      const{username,password} = values
      let result = await reqLogin(username,password)
      const {status,msg,data} = result
      if (status===0) {
        //1.服务器返回的user信息，还有token交由redux管理
        this.props.saveUserInfo(data)
        //2.跳转admin页面
        this.props.history.replace('/admin')
      }else{
        message.warning(msg,1)
      }
    };
    const onFinishFailed = () => {
      message.error('表单输入错误,请检查')
    }
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
  
            {
              required: true,
              message: '用户名不能为空',
            },
            {
              max: 12,
              message: '用户名不能超过12位'
            },
            {
              min: 4,
              message: '用户名最小为4位'
            },
            {
              pattern: /^\w+$/, message: '用户名必须是字母,数字,下划线'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" autoComplete='off' />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
  
              //         1). 必须输入
              // 2). 必须大于等于4位
              // 3). 必须小于等于12位
              // 4). 必须是英文、数字或下划线组成
  
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject('密码不能为空')
                } else if (value.length < 4) {
                  return Promise.reject('密码必须大于等于4位')
                } else if (value.length > 12) {
                  return Promise.reject('密码必须小于等于12位')
                } else if (!/^\w+$/.test(value)) {
                  return Promise.reject('密码必须是英文、数字或下划线组成')
                } else {
                  return Promise.resolve()
                }
              },
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            autoComplete='off' //自动补全
          />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" block htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  
}
}
export default connect(
  state =>({}),
 {
   saveUserInfo: createSaveUserInfoAction,
 }
)(withRouter(NormalLoginForm)
)