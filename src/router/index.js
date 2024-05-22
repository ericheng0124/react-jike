import {createBrowserRouter} from "react-router-dom"
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import {AuthRoute} from "@/components/AuthRoute"
import {lazy, Suspense} from "react";
// import Home from "@/pages/Home"
// import Article from "@/pages/Article"
// import Publish from "@/pages/Publish"


const Publish = lazy(() => import('@/pages/Publish'))
const Article = lazy(() => import('@/pages/Article'))
const Home = lazy(() => import('@/pages/Home'))


const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute><Layout/></AuthRoute>,
    children: [
      {
        index: true,  // 将home作为二级路由默认显示
        element: (
          <Suspense fallback={'加载中'}>
            <Home/>
          </Suspense>
        )
      },
      {
        path: 'article',
        element: (
          <Suspense fallback={'加载中'}>
            <Article/>
          </Suspense>
        )
      }, {
        path: 'publish',
        element: (
          <Suspense fallback={'加载中'}>
            <Publish/>
          </Suspense>
        )
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  }
])

export default router