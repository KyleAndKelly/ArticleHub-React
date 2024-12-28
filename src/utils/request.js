//1. rootURL configuration
//2. time expiration
//3. interceptor
import axios from 'axios'

const request = axios.create({
    baseURL:'http://geek.tiheima.net/v1_0',
    timeout:5000
})


request.interceptors.request.use((config)=> {
    return config
  }, (error)=> {
    return Promise.reject(error)
})

request.interceptors.response.use((response)=> {
    return response.data
  }, (error)=> {
    return Promise.reject(error)
})


export { request }