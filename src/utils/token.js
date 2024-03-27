// 封装三个和token相关的方法
const TOKENKEY = 'token_key'
// 1. 存储token
function setToken(token) {
  localStorage.setItem(TOKENKEY, token)
}

// 2. 获取token
function getToken() {
  return localStorage.getItem(TOKENKEY)
}

// 3. 删除token
function removeToken() {
  localStorage.removeItem(TOKENKEY)
}

export {
  setToken,
  getToken,
  removeToken
}