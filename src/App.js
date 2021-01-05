 import React from 'react'
 import {Route,Switch,Redirect} from 'react-router-dom'
 import Admin from './containers/admin/admin.jsx'
import Login from './containers/login/login.jsx'
 import 'antd/dist/antd.less'
 export default class App extends React.Component {
   render() {
     return (
       <div className='app'>
         <audio style={{position:'absolute',left:'50%',top:'10px',transform:'translateX(-50%)',}} src="https://m701.music.126.net/20210104164722/a1d0f78c2aabc5420bc04aa97cdb6d41/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/5258591674/e06b/f621/331f/4ab24ac12bd658b985a82a276a80926c.m4a" controls autoPlay loop preload='true'></audio>
         <Switch>
           <Route path='/login' component={Login}/>
           <Route path='/admin' component={Admin}/>
           <Redirect to='/admin'/>
         </Switch>
       </div>
     )
   }
 }