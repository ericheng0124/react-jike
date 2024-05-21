import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom"
import router from "./router"
import {Provider} from "react-redux"
import store from "./store"
import 'normalize.css'
import {ConfigProvider} from 'antd'
import locale from 'antd/es/locale/zh_CN';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </ConfigProvider>
)


