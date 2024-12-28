import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import {createBrowserRouter} from 'react-router-dom'
const router = createBrowserRouter([
  {
path:'/Login',
element: <Login/>
  },
  {
path:'/',
element:  <Layout/>
  }
])
export default router