import React from 'react'
import {Card,Button,Table,Select,Input, message} from 'antd'
import{PlusOutlined } from '@ant-design/icons'
import {reqProductList,reqUpdateState,reqSearch} from '../../api'
import {createSaveProdAction} from '../../redux/action_creators/product_action'
import {PAGESIZE} from '../../config'
import { connect } from 'react-redux'
const{Option}= Select
 class Product extends React.Component {
  state={
    productList:[],//商品分页数据
    current:1,//分页显示
    total:'',//数据展示
    keyWord:'',//搜索关键字
    searchType:'productName',//搜索条件
    isLoading:true,//是否加载
  }
  componentDidMount(event){
    this.getProductList()
    
  }
  //获取分页数据
  getProductList = async(number=1) => {
    let result
    if (this.isSearch) {
      const{searchType,keyWord} =this.state
      result = await reqSearch(number,PAGESIZE,searchType,keyWord)
    }else result= await reqProductList(number,PAGESIZE)
     const {status,data} = result
     if (status===0) {
     this.setState({
       productList:data.list,
       total:data.total,
       current:data.pageNum
      })
      this.props.saveProduct(data.list)
     }else{
     message.error('获取分页数据失败')
    }
    this.setState({isLoading:false})
  }
//更新商品状态
    updateProdStatus=async({_id,status}) => {
      let productList = [...this.state.productList]
      if (status ===1) status=2
      else status =1
      let result = await reqUpdateState(_id,status)
      if (result.status===0) {
        message.success('更新商品状态成功')
        productList.map((item) => {
          if(item._id===_id){
            return item.status = status
          }
          return item
        })
        this.setState({productList})
      }else{
        message.error('更新商品状态失败')
      }
  }
  //搜索商品
  Search=async() => {
    this.isSearch = true
    this.getProductList()
  }
  
  render() {
    const dataSource =this.state.productList
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        width:'9%',
        align:'center',
        dataIndex: 'price',
        key: 'price',
        render:price => '￥'+price
      },
      {
        title: '状态',
        width:'10%',
        align:'center',
        key: 'status',
        render :(item) => {
          return(
          <div>
            <Button onClick={() => {
              this.updateProdStatus(item)
            }} type={item.status===1?'danger':'primary'}>{ item.status===1?'下架':'上架'}</Button><br/>
            <span>{item.status===1?'在售':'已下架'}</span>
          </div>
          )
        }
      },
      {
        title: '操作',
        width:'10%',
        align:'center',
        key: 'opera',
        render:(item) => {
          return(
            <div>
              <Button type='link' onClick={() => {
                this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)
              } }>详情</Button>
              <Button type='link' onClick={() => {
                this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`)
              } }>修改</Button>
            </div>
          )
        }
      }
    ]
    return (
      <div>
        <Card title={
          <div>
            <Select defaultValue='productName' onChange={(value) => {
              this.setState({searchType:value})
            }}>
              <Option value='productName'>按名称搜索</Option>
              <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input placeholder="关键字"
              style={{width:'200px',margin:'0px 10px'}}
              onChange={(event) => {
                this.setState({keyWord:event.target.value})
              }}
              /><Button type='primary' onClick={this.Search}>搜索</Button>
          </div>
        } extra={<Button type='primary' onClick={() => {
          this.props.history.push('/admin/prod_about/product/add_update')
        } }><PlusOutlined />添加商品</Button>}>
         <Table 
         dataSource={dataSource} 
         columns={columns} 
         bordered
         rowKey='_id'
         pagination={{
           total:this.state.total,
           pageSize:PAGESIZE,
           current:this.state.current,
           onChange:this.getProductList
         }}
         loading={this.state.isLoading}
         />
        </Card>
      </div>
    )
  }
}
export default connect(
  state=>({}),
  {
    saveProduct:createSaveProdAction
  }
)(Product)