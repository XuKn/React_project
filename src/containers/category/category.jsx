import React, { Component} from 'react'
import { Button, Card, message, Table, Modal,Input,Form} from 'antd';
import {  PlusOutlined } from '@ant-design/icons'
import { reqCategoryList,reqAddCategory,reqUpdateCategory } from '../../api';
import {createSaveTitleAction} from '../../redux/action_creators/category_action'
import { PAGESIZE } from '../../config/index'
import { connect } from 'react-redux';


 class Category extends Component {
  formRef = React.createRef();
  state = {
    categoryList: [],//存入商品分类数据
    visible:false,//显示框状态
    operType:'',//更新或添加
    isLoading:true,//是否加载
    modalCurrentId:''//id
  }
  //添加分类
  toAdd = async(obj) => {
    let result =await reqAddCategory(obj)
    let {status,data,msg} = result
    if (status===0) {
      let categoryList = [...this.state.categoryList]
      categoryList.unshift(data)
      this.setState({categoryList})
      message.success('添加成功')
    }else{
      message.error(msg,1)
    }
  }
  //更新分类
  toUpdate=async(obj) => {
    let result = await reqUpdateCategory(obj)
    const {status,msg} = result
    if(status === 0) {
      message.success('更新分类名称成功',1)
      this.getCategoryList()//重新请求商品列表
    }else{
      message.error(msg,1)
    }
  }
  //展示添加弹窗
  showAdd = () => {
    this.setState({
      operType:'add',
      visible:true,
      modalCurrentId:'',
    })
  };
  //展示更新弹窗
  showUpdate = (item) => {
    let {_id,name}=item
    this.setState({
      operType:'update',
      modalCurrentId:_id,
      visible:true,
    })  
    this.formRef.current.setFieldsValue({
      categoryName : name
    })
  };
  //确定按钮
  handleOk = async() => {
    const {operType} = this.state
    let result = await this.formRef.current.validateFields()//表单验证
    if (result) {
      if (operType==='add') this.toAdd(result)
      if (operType==='update'){
        const categoryId = this.state.modalCurrentId
        const categoryName = result.categoryName
        const categoryObj = {categoryId,categoryName}
        this.toUpdate(categoryObj)
      }
      this.setState({
      visible:false//表单消失
      })
      this.formRef.current.resetFields()//表单值重置
    }else{
      message.warning('表单输入有误,请检查',1)
      
    }
  }; 
  //取消按钮
  handleCancel = () => {
    this.formRef.current.resetFields()//表单值重置
    this.setState({
      visible:false
    })
  }
  //获取商品分类请求
   getCategoryList = async () => {
    let result = await reqCategoryList()
    let { status, data, msg } = result
    if (status === 0) {
      this.setState({ categoryList: data.reverse(), isLoading:false})
      this.props.saveCateList(data)
    } else {
      message.error(msg, 1)
    }
  }
  componentDidMount() {
    this.getCategoryList()
  }
  render() {
    const dataSource = this.state.categoryList;

    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: '_id',
        width: '20%',
        render: (item) => { return <Button onClick={() => {
          this.showUpdate(item)
        }} type='link'>修改分类</Button> },
        align: 'center',
      },
    ];
    const{operType} =this.state
    const{Item}=Form
    return (
      <div>
        <Card extra={<Button type='primary' onClick={this.showAdd}>{<PlusOutlined />}添加</Button>}>
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            rowKey='_id'
            pagination={{ pageSize: PAGESIZE, showQuickJumper: true }}
            loading={this.state.isLoading}

          />
        </Card>
        <Modal title={operType==='add'?'新增分类':'修改分类'}
         forceRender={true}
         visible={this.state.visible} 
         okText='确定'
         cancelText='取消'
         onOk={this.handleOk} 
         onCancel={this.handleCancel}>
           <Form
            ref={this.formRef}
            name="normal_login"
            className="login-form"
           >
            <Item
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: '分类名不能为空',
                },
              ]}
            >
              <Input   placeholder='请输入分类名' autoComplete='off' />
            </Item>
           </Form>
        </Modal>
      </div>
    )
  }

}
export default connect(
  state=>({}),
  {
    saveCateList: createSaveTitleAction
  }
)(Category)
