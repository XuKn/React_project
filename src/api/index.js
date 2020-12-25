import myAxios from './myAxios.js'
import {BASE_URL} from '../config/index.js'

export  const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})
  
