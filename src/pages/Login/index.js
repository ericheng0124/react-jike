import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import logo from '@/assets/logo.png'
import {useDispatch} from "react-redux";
import {fetchLogin} from "@/store/modules/user";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // 表单获取数据的方法
  const onFinish = async (values) => {
    // console.log('success:', values)  //后端服务器验证的账户密码是 {mobile:'13800000002',code:'246810'}
    // 触发异步action fetchLogin
    await dispatch(fetchLogin(values))
    // 1. 跳转页面
    navigate('/')
    // 2. 提示用户登录成功
    message.success('登陆成功!!!')
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt=""/>
        {/* 登录表单 */}
        {/*给Form表单组件增加 validateTrigger 属性值为出发条件的字符串格式例如"onChange","onBlur"*/}
        <Form
          validateTrigger={"onBlur"}
          onFinish={onFinish}  // 获取校验通过后收集到的数据
          layout="vertical"
        >
          <Form.Item
            label='手机号:'
            name="mobile"  // 绑定需要校验的字段名
            // 多条校验逻辑,先校验第一条 第一条通过之后在校验第二条
            rules={[  // 校验的规则
              {
                required: true,  // 非空校验
                message: '请输入手机号!'  // 校验失败的提示语
              },
              {
                pattern: /^1[3-9]\d{9}$/,  // 使用正则匹配
                message: '请输入正确的手机号格式!'
              }
            ]}
          >
            <Input size="large" placeholder="请输入手机号"/>
          </Form.Item>
          <Form.Item
            label='验证码:'
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码!'
              }
            ]}
          >
            <Input size="large" placeholder="请输入验证码"/>
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