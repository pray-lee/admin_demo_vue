import axios from 'axios'
import { baseURL } from '@/config'
import { Loading, Message } from 'element-ui'

// set loading
let loading
const startLoading = () => {
 loading = Loading.service({
   text: '拼命加载中...',
   lock: true,
   background: 'rgba(0,0,0,.7)'
 });
}
const endLoading = () => {
  loading.close()
}

// @ HttpRequest class
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {}
    }
    return config
  }
  // 注册拦截器
  interceptors(instance) {
    instance.interceptors.request.use(config => {
      // loading start
      startLoading()
      return config
    }, err => Promise.reject(err))

    instance.interceptors.response.use(response => {
      // loading end
      endLoading()
      return response
    }, err => {
      endLoading()
      Message.error('服务器异常')
      return Promise.reject(err)
    })
  }
  request(options) {
    const instance = axios.create()
    this.interceptors(instance)
    options = Object.assign(this.getInsideConfig(), options)
    return instance(options)
  }
}

export default HttpRequest
