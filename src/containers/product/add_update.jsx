import React, { Component } from 'react'
import {Card,Button,Form,Input,Select, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import { connect } from 'react-redux'
import {reqCategoryList,reqAddProduct,reqProdById,reqUpdateProduct} from '../../api/index'
import PictureWall from './picture_wall'
import RichText from './rich_text_aditor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
const {Item}=Form
const {Option} = Select
class AddUpdate extends Component {
  state={
    categoryList:[],//分类列表
    productType:'add',//添加还是更新
    _id:'',//商品id
    categoryId:'',//分类id
    name:'',//商品名称
    desc:'',//商品描述
    price:'',//商品价格
    imgs:[],//图片
    detail:''//详情
  }
  fromRef = React.createRef()
  //新增商品请求
  addProduct=async(productobj) => {
   let result = await reqAddProduct(productobj)
   let {status,msg}=result
   if (status===0) {
     message.success('新增商品成功')
     this.props.history.replace('/admin/prod_about/product')
   }else{
     message.error(msg,1)
   }
  }
  
  handleSubmit=async(event) => {
    event.preventDefault()
    //获取图片名
    let imgs= this.pictureWall.getPicture()
    //获取详情
    let detail = this.richText.getRichText()
    const {productType,_id} =this.state 
    let value =await this.fromRef.current.validateFields()
    let result
    if (productType==='add') result = await reqAddProduct({...value,imgs,detail})   
    else result = await reqUpdateProduct({...value,imgs,detail,_id})
    let {status,msg}=result
    if (status===0) {
      message.success('操作成功')
      this.props.history.replace('/admin/prod_about/product')
    }else{
      message.error(msg,1)
    }
  }
  //获取分类列表
  getCategoryList=async() => {
    let result = await reqCategoryList()
    const{status,data}=result
    if (status===0) {
      this.setState({categoryList:data})
    }else{
      message.error('分类列表请求出错',1)
    }
  }
  //获取商品信息
  getProductInfo=async(id) => {
     let result = await reqProdById(id)
     const{status,data,msg}=result
     if (status===0) {
        //获取图片
        this.pictureWall.setImgArr(data.imgs)
        //获取详情
        this.richText.setRichText(data.detail)
        this.fromRef.current.setFieldsValue({...data})
     }else{
       message.error(msg,1)
     }
  }
  componentDidMount(){
    let {id} = this.props.match.params
    //获取分类列表
    let result = this.props.categoryList
    if (result.length) {
      this.setState({categoryList:result})
    }else{
     this.getCategoryList()
    }
    if (id) {
      let result = this.props.productList.find((item) => {
        return item._id===id
      })
      if (result) {
        this.setState({...result})
        //获取图片
        this.pictureWall.setImgArr(result.imgs)
        //获取详情
        this.richText.setRichText(result.detail)
        this.fromRef.current.setFieldsValue({...result})
      }else{
        this.getProductInfo(id)
      }
      this.setState({productType:'update',_id:id})
    }
    
  }
  render() {
    const{categoryList,productType} = this.state
    return (
         <Card title={
          <div>
          <Button type='link' size='small' onClick={() => {
            this.props.history.push('/admin/prod_about/product')
            }}><ArrowLeftOutlined />
          </Button>
          <span>{productType==='add'?'商品添加':'商品更新'}</span>
          </div> 
        }
        >
          <Form
            ref={this.fromRef}
            labelCol={{md:2}}
            wrapperCol={{md:7}}
            onSubmitCapture={this.handleSubmit}
          >
            <Item
              label="商品名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '商品名称必须输入',
                },
              ]}
            >
              <Input placeholder='商品名称' autoComplete='off' />
            </Item>
            <Item
              label="商品描述"
              name="desc"
              rules={[
                {
                  required: true,
                  message: '商品描述必须输入',
                },
              ]}
            >
              <Input placeholder='商品描述' autoComplete='off'/>
            </Item>
            <Item
              label="商品价格"
              name="price"
              rules={[
                {
                  required: true,
                  message: '商品价格必须输入',
                },
              ]}
            >
              <Input type='number'autoComplete='off' placeholder='商品价格'addonBefore='￥' addonAfter='元'/>
            </Item>
            <Item
              label="商品分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: '商品分类必须输入',
                },
              ]}
            >
              <Select placeholder='请选择' >
                 {categoryList.map((item) => {
                   return <Option key={item._id} value={item._id} >{item.name}</Option>
                 })
               }
              </Select>
            </Item>
            <Item
              label="商品图片"
              wrapperCol={{md:9}}
            >
              <PictureWall 
              ref={(pictureWall) => {
                this.pictureWall=pictureWall
              }}
              />
            </Item>
            <Item
              label="商品详情"
              wrapperCol={{md:16}}
            >
              <RichText ref={(richText) => {
                this.richText=richText
              }}/>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Item>
          </Form>
        </Card>
    )
  }
}
export default connect(
  state=>({
    categoryList:state.categoryList,
    productList:state.productList
  }),
  {
  }
)(AddUpdate)