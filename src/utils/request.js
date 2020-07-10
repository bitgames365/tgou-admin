import axios from 'axios'
import { VueAxios } from './axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      console.log(data.message)
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      let description= 'Authorization verification failed'
      console.log(description)
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  /*
  const token = storage.get(ACCESS_TOKEN)
  if (token) {
    const bearerToken = 'Bearer ' + token
    config.headers['Authorization'] = bearerToken
  }
  */
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
