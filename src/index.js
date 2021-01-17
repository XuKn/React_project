import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './redux/store.js'
import App from './App';
ReactDOM.render( 
  //最外围组件使所有组件都可以得到store对象
  <Provider store={store}> 
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </Provider>  , document.getElementById('root'));