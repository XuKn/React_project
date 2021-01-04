import React from 'react'
import {Button, Card,Modal,Form,Input,message,Table,Tree  } from 'antd'
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole,reqUpdateRole} from '../../api/index'
import menuList from '../../config/menu-config'
import {connect} from 'react-redux'
class Role extends React.Component {
  state={
    isShowAdd:false,//控制新增
    isShowUpdate:false,//控制更新
    RoleList :[],//角色列表
    checkedKeys:[],//勾选的key
    menuList,//导航菜单列表
    _id :''
  }
  //获取角色列表
  getRoleList=async() => {
   let result = await reqRoleList()
   const {status,data} = result 
   if (status===0) {
     this.setState({RoleList:data})
   }else{
     message.error('初始化角色列表失败',1)
   }
  }
  //表单ref
  formRef = React.createRef()
  //新增回调
  addRole=() => {
    this.setState({
      isShowAdd:true
    })
  }
  //更新回调
  updateRole=(id) => {
    const{RoleList}=this.state
    let result =RoleList.find((item) => {
      return item._id === id
    })
    if (result) {
      this.setState({checkedKeys:result.menus})
    }else{
      message.error('获取数据失败',1)
    }
    this.setState({
      _id:id,
      isShowUpdate:true
    })
  }
  //新增确定
  handleOk = async() => {
    let result = await this.formRef.current.validateFields()//表单验证
    if (result) {
      let value = await reqAddRole(result.roleName)
      const {status}=value
      if (status===0) {
        message.success('角色添加成功',1)
        this.setState({
        isShowAdd:false//表单消失
        })
        this.formRef.current.resetFields()//表单值重置
        this.getRoleList()
      }else{
        message.error('角色添加失败',1)
      }
    }else{
      message.warning('表单输入有误,请检查',1)
    }
  }; 
  //新增取消
  handleCancel=() => {
    this.formRef.current.resetFields()//表单值重置
    this.setState({
      isShowAdd:false
    })
    
  }
  //更新确定
  handlesetOk=async() => {
    const {_id,checkedKeys} =this.state
    const {username} = this.props
    let result = await reqUpdateRole({_id,menus:checkedKeys,auth_name:username})
    const {status}=result
    if (status===0) {
      message.success('更新成功',1)
      this.setState({
      isShowUpdate:false
    })
    this.getRoleList()
    }else{
      message.error('更新失败',1)
    }
    
  }
  //更新取消
  handlesetCancel=() => {
    this.setState({
      isShowUpdate:false
    })
  }
  componentDidMount(){
    //初始化列表
    this.getRoleList()
  }
  render() {
    const dataSource =this.state.RoleList
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(create_time) =>  dayjs(create_time).format('YYYY年 MM月DD日 HH:mm:ss')
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(auth_time) => {
          if (auth_time) {
            return dayjs(auth_time).format('YYYY年 MM月DD日 HH:mm:ss')
          }
        }
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
        width:'15%'
      },
      {
        title: '操作',
        width:'15%',
        render:(item) => <Button type='link' onClick={() => {
          this.updateRole(item._id)
        }}>设置权限</Button>
      },
    ];
    // tree start----------------
    const treeData = this.state.menuList
    const onCheck = (checkedKeys) => {
      this.setState({checkedKeys});
    };
    //tree end -------------
    return (
      <div>
        <Card title={<Button type='primary' onClick={this.addRole}>添加角色</Button>}>
        <Table 
        dataSource={dataSource} 
        columns={columns} 
        bordered
        rowKey='_id'
        />;
        </Card>
        {/* 新增角色 */}
        <Modal title="添加角色"
         visible={this.state.isShowAdd} 
         okText='确定'
         cancelText='取消'
         onOk={this.handleOk} 
         onCancel={this.handleCancel}
        >
          <Form
          ref ={this.formRef}
          >
          <Form.Item
            label='角色名称'
            name="roleName"
            rules={[{ required: true, message: '角色名必须输入' }]}
          >
          <Input autoComplete='off'  />
          </Form.Item></Form>
        {/* 更新角色 */}
        </Modal>
        {/* 更新角色 */}
        <Modal title="设置角色权限"
         visible={this.state.isShowUpdate} 
         okText='确定'
         cancelText='取消'
         onOk={this.handlesetOk} 
         onCancel={this.handlesetCancel}
        >
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={this.state.checkedKeys}
            treeData={treeData}
            defaultExpandAll='true'
          />
          
        </Modal>
      </div>
    )
  }
}
export default connect(
  state=>({username:state.userInfo.user.username}),
  {

  }
)(Role)