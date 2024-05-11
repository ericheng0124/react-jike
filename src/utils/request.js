// axios的封装处理
import axios from "axios";
import {getToken, removeToken} from "@/utils/token";
import router from '@/router';


const request = axios.create({
  // 1.根域名配置
  baseURL: 'http://geek.itheima.net/v1_0',
  // 2.配置超时时间 单位:毫秒
  timeout: 5000
})

// 3.1 添加请求拦截器
// 请求发送之前 做拦截 插入一些自定义的配置 [参数的处理]
request.interceptors.request.use((config) => {
  // 操作config 注入token数据
  // 1. 获取token
  const token = getToken()
  // 2. 注入token,按照后端的格式要求做token的拼接
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 3.2 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 监控401 token失效
  console.dir(error)
  if(error.response.status===401){
    removeToken()  // 清除本地token
    router.navigate('/login')  // 跳转登陆
    window.location.reload()  // 解决页面不自动跳转的问题,使用window.location.reload() 页面重载方法
  }
  return Promise.reject(error)
})

export {request}