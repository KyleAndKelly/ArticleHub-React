//1. rootURL configuration
//2. time expiration
//3. interceptor
import axios from 'axios'
import { getToken } from './token'

const request = axios.create({
    baseURL: 'https://geek.itheima.net',
    timeout:5000
})


request.interceptors.request.use((config)=> {
    // if not login add token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

request.interceptors.response.use((response)=> {
    console.log(response.data)
    return response.data
  }, (error)=> {
    return Promise.reject(error)
})


export { request }