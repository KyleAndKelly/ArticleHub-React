import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet,useLoaderData,useLocation,useNavigate} from 'react-router-dom'
import { useLocale } from 'antd/es/locale'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo ,clearUserInfo} from '@/store/modules/user'
import { useEffect } from 'react'
const { Header, Sider } = Layout

const items = [
  {
    label: 'HOME',
    key: '/Layout/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Article',
    key: '/Layout/article',
    icon: <DiffOutlined />,
  },
  {
    label: 'Publish',
    key: '/layout/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  const name = useSelector(state => state.user.userInfo.name)
  const selectedKey = useLocation().pathname
  const navigator = useNavigate()
  const menuClick = (route) => {
    navigator(route.key)
  }
  const loginOut = () => {
    dispatch(clearUserInfo())
    navigator('/')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="Quit?" okText="Quit" cancelText="取消" onConfirm={loginOut}>
              <LogoutOutlined /> Log out
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
            style={{ height: '100%', borderRight: 0 }}
            onClick={menuClick}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout