import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import './css/header.less'
import { createDeleteUserInfoAction } from '../../../redux/action_creators/login_action'
import screenfull from 'screenfull'
import Weather from '../../../static/images/d0.gif'
import menuConfig from '../../../config/menu-config'
const { confirm } = Modal;
class Header extends React.Component {
  state = {
    isFull: false,
    dayjs:dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    title:''
  }
  //全屏
  Fullscreen=() => {
      screenfull.toggle();
  }
  componentDidMount() {
    //屏幕放大缩小
    screenfull.on('change', () => {
     let isFull = !this.state.isFull
      this.setState({ isFull })
    });
    //时间
    this.timeid = setInterval(() => {
      this.setState({dayjs:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')})
    }, 1000);
    this.menuTitles()   
  }
  //退出登录, 删除用户信息
  logout = () => {
    confirm({
      cancelText:'取消',
      okText:'确定',
      title: '确定要退出吗?',
      icon: <ExclamationCircleOutlined />,
      content: '退出后将重新输入账号密码登录',
      onOk() {
         this.props.deleteUserInfo()
      },
    });
   
  }
  //设置标题
  menuTitles = () => {
    let pathKey = this.props.location.pathname.split('/').reverse()[0]
    let title = '';
    menuConfig.forEach((item) => {
      if(item.children instanceof Array){
        let cmp = item.children.find((citem) => {
          return   citem.key === pathKey
        })
        if (cmp) {
          title = cmp.title
        }
      }else {
        if (item.key === pathKey) title=item.title
      }
    })
    this.setState({title})
  }

  //清除定时器
  componentWillUnmount(){
    clearInterval(this.timeid)
  }

  render() {
    let {isFull} =this.state
    let { username } = this.props.userInfo.user
    return (
      <header className='header'>
        <div className='header-top'>
          <Button size='small' onClick={this.Fullscreen}>
            {isFull?<FullscreenExitOutlined/>:<FullscreenOutlined/>}
          </Button>
          <span className='username'>欢迎,{username}</span>
          <Button onClick={this.logout} type='link'>退出</Button>
        </div>
        <div className='header-bottom'>
          <div className="header-bottom-left">
            {this.props.title||this.state.title}
          </div>
          <div className="header-bottom-right">
            {this.state.dayjs}
            <img src={Weather} alt='weather'></img>
            晴
          </div>
        </div>
      </header>
    )
  }
}
export default connect(
  state => {
    return { userInfo: state.userInfo,
      title : state.menuTitle 
    }
  },
  {
    deleteUserInfo: createDeleteUserInfoAction
  }
)(withRouter(Header))