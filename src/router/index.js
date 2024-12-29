import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import {createBrowserRouter} from 'react-router-dom'
import AuthRoute from '@/components/Auth'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'
import Home from '@/pages/Home'
const router = createBrowserRouter([
  {
    path:'/',
    element: <Login/>
  },

  {
    path:'/Layout',
    element: <AuthRoute><Layout /></AuthRoute>,
    children:[
      {
        path:'home',
        element:<Home/>
      },
      {
        path:'article',
        element:<Article/>
      },
      {
        path:'publish',
        element:<Publish/>
      }

    ]
  }
])
export default router
