import axios from 'axios'
import { ElMessage } from 'element-plus'

const API_URL = process.env.VUE_APP_API_URL

const requestAxios = axios.create({
  baseURL: API_URL
})

requestAxios.interceptors.response.use((response) => {
  return response
}, (error) => {
  ElMessage({
    type: 'error',
    message: error.response.data.message
  })
  return Promise.reject(error)
})

export default requestAxios
