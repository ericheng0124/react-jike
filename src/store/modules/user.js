// 和用户相关的状态管理

import {createSlice} from "@reduxjs/toolkit"
import {setToken as _setToken, getToken, removeToken} from "@/utils"
import {loginAPI, getProfileAPI} from "@/apis/user"

const userStore = createSlice({
  // 模块名
  name: 'user',
  // 初始化数据状态
  initialState: {
    // 在初始化token的时候先判断本地的localStorage里是否值,如果有就直接使用该值,如果没有就设置为空
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 在 localStorage 中也存一份获取到的token
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()  // 清除本地存储的token
    }
  }
})

// 解构出actionCreater
const {setToken, setUserInfo, clearUserInfo} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法 完成登陆获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. 发送异步请求
    const res = await loginAPI(loginForm)
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}

export {fetchLogin, setToken, fetchUserInfo, clearUserInfo}

export default userReducer