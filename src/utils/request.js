// axios的封装处理
import axios from "axios";


const request = axios.create({
  // 1.根域名配置
  baseURL:'http://geek.itheima.net/v1_0',
  // 2.配置超时时间 单位:毫秒
  timeout:5000
})

// 3.1 添加请求拦截器
// 请求发送之前 做拦截 插入一些自定义的配置 [参数的处理]
request.interceptors.request.use((config)=> {
  return config
}, (error)=> {
  return Promise.reject(error)
})

// 3.2 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response)=> {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error)=> {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})


export {request}