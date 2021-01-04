import React, { Component } from 'react'
import {Button, Card, List,message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import './detail.less'
import { connect } from 'react-redux'
import {reqProdById,reqCategoryList} from '../../api/index'
import {BASE_URL} from '../../config'
const{Item}=List
class Detail extends Component {
  state={
    categoryId:'',//id
    desc:'',//描述
    detail:'',//详情
    imgs:[],//图片
    name:'',//标题
    price:'',//价格
    categoryName:'',//商品分类
    isLoading:true//加载
  }
  //获取商品信息
  getProdById=async(id) => {
   let result = await reqProdById(id)
   let {status,data} =result
   if (status===0) {
     let {categoryId,desc,detail,imgs,name,price} = data
     this.setState({categoryId,desc,detail,imgs,name,price})
   }
  }
  //获取商品分类
  getProdCategory=async(categoryId) => {
    let reduxCateList = this.props.categoryList
    if (reduxCateList.length) {
       let result = reduxCateList.find((item) =>item._id === categoryId)
     if (result) {
       this.setState({categoryName:result.name,isLoading:false})
     }
    }else{
    let result =await reqCategoryList()
    let {categoryId}=this.state
    let {status,data,msg} =result
    if (status===0) {
     let result = data.find((item) =>item._id ===categoryId)
      if (result){this.setState({categoryName:result.name,isLoading:false})}
    }else message.error(msg,1)
  }
 
}
   componentDidMount(){
    let {id} = this.props.match.params
   let reduxProdList =this.props.productList
   if (reduxProdList.length) {
    let result = reduxProdList.find((item) =>item._id ===id)
   if (result) {
     this.categoryId = result.categoryId
     this.setState({...result})
   }
   }
   else this.getProdById(id) 
    
   this.getProdCategory(this.categoryId)
   
 }
  render() {
    return (
        <Card title={
          <div>
          <Button type='link' size='small' onClick={() => {
            this.props.history.push('/admin/prod_about/product')
            }}><ArrowLeftOutlined />
          </Button>
          <span>商品详情</span>
          </div> 
        }
        loading={this.state.isLoading}
        >
          <List 
          itemLayout="vertical"
         >
            <Item>
              <span className='prod_name'>商品名称:</span>
              <span>{this.state.name}</span>
            </Item>
            <Item>
              <span className='prod_name'>商品描述:</span>
              <span>{this.state.desc}</span>
            </Item>
            <Item>
              <span className='prod_name'>商品价格:</span>
              <span>{this.state.price}元</span>
            </Item>
            <Item>
              <span className='prod_name'>所属分类:</span>
              <span>{this.state.categoryName}</span>
            </Item>
            <Item>
              <span className='prod_name'>商品图片:</span>
              {
                this.state.imgs.map((item,index) =>{
                  return <img key={index} src={`${BASE_URL}/upload/`+item} alt='商品图片' style={{width:'220px',height:'220px'}}/>
                })
              }
            </Item>
            <Item>
              <span className='prod_name'>商品详情:</span>
              <span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
            </Item>
          </List>
        </Card>
    )
  }
}

export default connect(
  state=>({
    productList:state.productList,
    categoryList :state.categoryList
  }),
  {
  }
)(Detail)