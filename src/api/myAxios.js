import { message } from 'antd'
import axios from 'axios'
import qs from 'querystring'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const instance = axios.create({
  timeout:4000
})

instance.interceptors.request.use(function (config) {
   Nprogress.start()
  const{method,data} = config
  if (method ==='post' ) {
    if (data instanceof Object) {
      config.data = qs.stringify(data)
    }
  }
  return config
})
instance.interceptors.response.use(
  (response) => {
    Nprogress.done()
    return response.data
  },
  (error) => {
    Nprogress.done()
    message.warning(error.message,1)
    return new Promise (() => {})
  }
)
export default instance