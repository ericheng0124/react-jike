// 和用户相关的状态管理

import {createSlice} from "@reduxjs/toolkit";
import {request} from "@/utils";

const userStore = createSlice({
  // 模块名
  name: 'user',
  // 初始化数据状态
  initialState: {
    // 在初始化token的时候先判断本地的localStorage里是否值,如果有就直接使用该值,如果没有就设置为空
    token: localStorage.getItem('token_key') || ''
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // 在 localStorage 中也存一份获取到的token
      localStorage.setItem('token_key', action.payload)
    }
  }
})

// 解构出actionCreater
const {setToken} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法 完成登陆获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. 发送异步请求
    const res = await request.post('/authorizations', loginForm)
    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

export {fetchLogin, setToken}

export default userReducer