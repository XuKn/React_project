import React from 'react'
import {Button, Card,Modal,Form,Input,Select,Table,message} from 'antd'
import {reqUserList,reqAddUser,reqUpdateUser,reqDeleUser} from '../../api'
import dayjs from 'dayjs'
import {PAGESIZE} from '../../config'
const {Option} =Select
export default class User extends React.Component {
  state={
    updateVisible:false,//更新的弹窗
    visible:false,//新增的弹窗
    userList:[],//用户列表
    roleList:[],//角色列表
    _id:''//用户id
  }
  componentDidMount(){
    this.getUserList()
  }
  //获取用户列表
  getUserList=async() => {
   let result = await reqUserList()
   if (result) {
     const {status,data} =result 
     if (status===0) {
      this.setState({userList:data.users.reverse(),
      roleList:data.roles
      })
    }
   }else{
     message.error('初始化用户列表失败',1)
   }
  }
  formRef = React.createRef()
  //创建用户按钮
  setUser=() => {
    this.setState({visible:true})
  }
  //新增用户
  addUser=async(userobj) => {
    const userList =[...this.state.userList]
    let result = await reqAddUser(userobj)
    if (result) {
      const{status,data}=result
      if (status===0) {
        userList.unshift(data)
        this.setState({userList})
        message.success('新增用户成功',1)
        this.formRef.current.resetFields()
      }
    }else{
      message.error('新增用户失败',1)
    }
  }
  //更新用户
  userUpdate=(item) => {
    this.setState({updateVisible:true,_id:item._id})
    this.user.setFieldsValue({...item})
  }
  //删除用户
  deleUser=(user) => {
    Modal.confirm({
      okText:'确定',
      cancelText:'取消',
      content: `确定删除${user.username}吗?`,
      onOk: async () => {
        let result = await reqDeleUser(user._id)
        if (result) {
          const {status}=result
          if (status===0) {
            message.success('删除用户成功',1)
            this.getUserList()
          }else{
            message.error('用户删除失败',1)
          }
        }
      }
    })
  
  }
  //发送更新的请求
  setUserinfo=async(userobj) => {
      let arr = []
      let result = await reqUpdateUser(userobj)
      if (result) {
        const{status,data,msg}=result
        if (status===0) {
          message.success('更新成功',1)
          arr.push(data)
          this.setState({
            updateVisible:false,
            userList:arr
          })
          this.getUserList()
        }else{
          message.error(msg,1)
        }
      } 
  }
  //创建确定的按钮
  handleOk=async() => {
   let values =await this.formRef.current.validateFields()
   if (values) {
     this.addUser(values) 
   }else{
     message.error('获取用户信息失败',1)
   }
    this.setState({visible:false})
  }
  //创建取消的按钮
  handleCancel=() => {
    this.formRef.current.resetFields()
    this.setState({visible:false})
  }
  //更新确定的按钮
  handlesetOk=async() => {
    const {_id} =this.state
    let values =await this.user.validateFields()
    if (values) {
      this.setUserinfo({...values,_id})
    }
  }
  //更新取消的按钮
  handlesetCancel=() => {
    this.setState({updateVisible:false})
  }
  render() {
    const dataSource =this.state.userList
    const columns = [
      {
        title: '用户名',
        width:'10%',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        width:'20%',
        dataIndex: 'email',
      },
      {
        title: '电话',
        width:'20%',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        width:'20%',
        dataIndex: 'create_time',
        render:(time) => dayjs(time).format('YYYY年 MM月DD日 HH:MM:ss')
      },
      {
        title: '所属角色',
        width:'15%',
        dataIndex: 'role_id',
        render:(id) => {
         let result = this.state.roleList.find((item)=>{
            return item._id === id
          })
          return result.name
        }
      },
      {
        title: '操作',
        width:'15%',
        render:(item) => {
          return( 
          <div>
            <Button type='link' onClick={()=>{this.userUpdate(item)}}>修改</Button>
            <Button type='link' onClick={() => {this.deleUser(item)}}>删除</Button>
          </div>
          )
        }
      },
    ];
    return (
      <div>
      <Card title={<Button type='primary' onClick={this.setUser}>创建用户</Button>}>
        <Table 
         dataSource={dataSource}
         columns={columns}
         bordered
         rowKey='_id'
         pagination={{defaultPageSize:PAGESIZE}} 
        />;
      </Card>
      {/* 新增弹窗 */}
      <Modal 
      title="创建用户" 
      visible={this.state.visible} 
      onOk={this.handleOk} 
      onCancel={this.handleCancel}
      okText='确定'
      cancelText='取消'
      >
        <Form
        labelCol={{md:4}}
        wrapperCol={{md:16}}
        ref={this.formRef}
        >
          <Form.Item
            label="用户名"
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
            <Input  autoComplete='off' placeholder='请输入用户名'/>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '密码不能为空',
              },
              {
                max: 12,
                message: '密码不能超过12位'
              },
              {
                min: 4,
                message: '密码最小为4位'
              },
              {
                pattern: /^\w+$/, message: '密码必须是字母,数字,下划线'
              }
            ]}
          >
            <Input  autoComplete='off' placeholder='请输入密码'/>
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '手机号不能为空' }, {
              pattern: /^\d+$/, message: '手机号必须是数字'
            }]}
          >
            <Input autoComplete='off' placeholder='请输入手机号'/>
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不能为空' },
            {pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '邮箱格式不正确'}]}
          >
            <Input  autoComplete='off' placeholder='请输入邮箱'/>
          </Form.Item>
          <Form.Item
            label="角色"
            name="role_id"
            rules={[{ required: true,message:'必须选择一个角色' }]}
          >
             <Select placeholder='请选择角色'>
               {this.state.roleList.map((item) => {
                 return <Option key={item._id} value={item._id}>{item.name}</Option>
               })}
             </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* 更新弹窗 */}
      <Modal 
      title="修改用户" 
      forceRender={true}
      visible={this.state.updateVisible} 
      onOk={this.handlesetOk} 
      onCancel={this.handlesetCancel}
      okText='确定'
      cancelText='取消'
      >
        <Form
        labelCol={{md:4}}
        wrapperCol={{md:16}}
        ref={(user) => {
          this.user=user
        }}
        >
          <Form.Item
            label="用户名"
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
            <Input  autoComplete='off' placeholder='请输入用户名'/>
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '手机号不能为空' }, {
              pattern: /^\d+$/, message: '手机号必须是数字'
            }]}
          >
            <Input autoComplete='off' placeholder='请输入手机号'/>
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不能为空' },
            {pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: '邮箱格式不正确'}]}
          >
            <Input  autoComplete='off' placeholder='请输入邮箱'/>
          </Form.Item>
          <Form.Item
            label="角色"
            name="role_id"
            rules={[{ required: true,message:'必须选择一个角色' }]}
          >
             <Select placeholder='请选择角色'>
               {this.state.roleList.map((item) => {
                 return <Option key={item._id} value={item._id}>{item.name}</Option>
               })}
             </Select>
          </Form.Item>
        </Form>
      </Modal>
      </div>
    )
  }
}