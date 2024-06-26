import {Layout, Menu, Popconfirm} from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo, fetchUserInfo} from "@/store/modules/user";

const {Header, Sider} = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined/>,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined/>,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined/>,
  },
]

const GeekLayout = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onMenuClick = (route) => {
    const path = route.key
    navigate(path)
  }

  const location = useLocation()
  const selectedKey = location.pathname

  // 获取登陆用户信息的用户名
  const username = useSelector(state => state.user.userInfo.name)

  // 退出登陆的确认回调
  const onConfirm = ()=>{
    console.log('确认退出')
    dispatch(clearUserInfo())
    navigate('/login')
  }

   // 触发个人用户信息action

  useEffect(()=>{
    dispatch(fetchUserInfo())
  },[dispatch])

  return (
    <Layout>
      <Header className="header">
        <div className="logo"/>
        <div className="user-info">
          <span className="user-name">{username}</span>
          <span className="user-logout">
            {/*确认框组件*/}
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            items={items}
            style={{height: '100%', borderRight: 0}}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout className="layout-content" style={{padding: 20}}>
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout