# 极客博客项目

## 1 项目初始化搭建
### 1.1 使用CRA创建项目
```
create-react-app react-jike
```
尝试启动项目

### 1.2 新建项目标准化文件路径
```
--src
   |--api    // api接口相关文件夹
   |--assets    // 静态资源文件夹
   |--components    // 通用组件文件夹
   |--pages    // 页面组件文件夹
   |--router    // 路由Router相关文件夹
   |--store    // Redux状态相关文件夹
   |--utils    // 辅助工具函数相关文件夹
```

### 1.3 安装SCSS,适配高级样式语法和嵌套语法
```
npm i -D sass
```
安装sass包之后就可使用scss便是样式文件了.

他们之间的关系是这样的,编写的scss样式需要使用sass进行编译转化为css.
style.scss ---> sass ---> style.css

### 1.4 配置路径解析
#### 1.4.1 安装craco
```
npm i -D @craco/craco
```
#### 1.4.2 创建配置文件
在项目根目录下创建一个craco.config.js的文件
#### 1.4.3 配置文件中添加解析配置
给craco.config.js文件添加解析配置,这里使用 @ 代替项目根目录路径
```
const path = require('path')
module.exprots = {
    webpack:{
        alias:{
            '@':path.resolve(__dirname,'src')        
        }    
    }
}
```
#### 1.4.4 在包文件中配置启动和打包命令
打开package.json文件，找到启动和打包命令配置位置（"scripts"），修改启动和打包命令如下列代码.
```
"scripts":{
    "start":"craco start",  // 将react-scripts 替换为 craco
    "build":"craco build",  // 将react-scripts 替换为 craco
    "test":"react-scripts test",
    "eject":"react-scripts eject"
}
```
这样在引入文件的时候就可以直接使用@替代！

### 1.5 联想路径配置
#### 1.5.1 创建配置文件
在项目根目录下创建一个名为jsconfig.json的配置文件
#### 1.5.2 添加路径提示配置
给jsconfig.json文件添加路径提示配置
```
{
    "compilerOptions":{
        "baseUrl":"./",
        "paths":{
            "@/*":[
                "src/*"            
            ]        
        }    
    }
}
```
这样就完成了项目初始化的配置,[标准化了项目的文件夹路径],给项目添加了[路径解析配置],[联想路径配置],[scss样式配置].

## 2 安装antd组件库
```
npm i antd --save
```

## 3 配置基础路由Router
### 3.1 安装react-router-dom包
```text
npm i react-router-dom
```
### 3.2 装备两个基础路由组件Layout和Login
找到pages文件,在下面新增两个文件夹Layout和Login
分别在两个新建的页面组件中初始化创建组件.

pages/Layout/index.js
```js
import React from 'react';

const Layout = () => {
  return (
    <div>
      this is Layout...
    </div>
  );
};

export default Layout;
```
pages/Login/index.js
```js
import React from 'react';

const Login = () => {
  return (
    <div>
      this is Layout...
    </div>
  );
};

export default Login;
```
### 3.3 引入组件进行路由配置,导出router实例
在router文件夹下创建index.js的路由配置文件
引入之前创建的两个页面组件,然后配置路径和对应的组件,然后导出router实例.

router/index.js
```js
import {createBrowserRouter} from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>
  },
  {
    path: '/login',
    element: <Login/>
  }
])

export default router
```
### 3.4 在入口文件中渲染并导入router实例
在src/index.js这个项目入口文件中引入<RouterProvider>并导入router实例
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import router from "./router";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
```
## 4 登陆页面
### 4.1 登陆页面-基础静态结构
使用 antd现成的组件 创建登录页的内容结构
主要组件:Card\Form\Input\Button
rsc/pages/Login/index.js
```js
import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form>
          <Form.Item>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
```
静态页面的样式
rsc/pages/Login/index.scss
```scss
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: center/cover url('~@/assets/login.png');

  .login-logo {
    width: 200px;
    height: 60px;
    display: block;
    margin: 0 auto 20px;
  }

  .login-container {
    width: 440px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);
  }

  .login-checkbox-label {
    color: #1890ff;
  }
}
```
### 4.2 表单效验实现
表单校验可以在提交登录之前校验用户的输入是否符合预期，如果不符合就阻止提交, 显示错误信息
- 参开官网实现基础Demo

        给 FormItem 绑定 name

        给 FormItem 绑定 rules

```js
<Form.Item
  name="mobile"  // 绑定需要校验的字段名
  // 多条校验逻辑,先校验第一条 第一条通过之后在校验第二条
  rules={[  // 校验的规则
    {
      required:true,  // 非空校验
      message:'请输入手机号!'  // 校验失败的提示语
    }
  ]}
>
```
- 根据业务定制化修改

        增加失焦时效验

        手机号有效格式验证
```js
{/*给Form表单组件增加 validateTrigger 属性值为出发条件的字符串格式例如"onChange","onBlur"*/}
<Form validateTrigger={"onBlur"}>
  <Form.Item
    name="mobile"  // 绑定需要校验的字段名
    // 多条校验逻辑,先校验第一条 第一条通过之后在校验第二条
    rules={[  // 校验的规则
      {
        required:true,  // 非空校验
        message:'请输入手机号!'  // 校验失败的提示语
      },
      {
        pattern:/^1[3-9]\d{9}$/,  // 使用正则匹配
        message:'请输入正确的手机号格式!'
      }
    ]}
  >
```
### 4.3 登陆页的表单数据获取
在Form表单组件中添加一个onFinish属性就可以添加一个函数方法传入value就可以获取到验证通过后收集到的数据.

获取到的数据值是一个对象,对象的键就是FormItem绑定的name,值就是对应输入的值.
```js
const Login = () => {
  // 表单获取数据的方法
  const onFinish = (value)=>{
    console.log('success:',value)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        {/*给Form表单组件增加 validateTrigger 属性值为出发条件的字符串格式例如"onChange","onBlur"*/}
        <Form
          validateTrigger={"onBlur"}
          onFinish={onFinish}  // 获取校验通过后收集到的数据
        >
```
