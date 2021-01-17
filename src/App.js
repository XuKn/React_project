 import React from 'react'
 import {Route,Switch,Redirect} from 'react-router-dom'
 import Admin from './containers/admin/admin.jsx'
import Login from './containers/login/login.jsx'
 import 'antd/dist/antd.less'
 export default class App extends React.Component {
   render() {
     return (
       <div className='app'>
         <Switch>
           <Route path='/login' component={Login}/>
           <Route path='/admin' component={Admin}/>
           <Redirect to='/admin'/>
         </Switch>
       </div>
     )
   }
 }