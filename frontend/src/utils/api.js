import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('basudevbnb_user')
  if (stored) {
    const user = JSON.parse(stored)
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isAuthRoute = err.config?.url?.includes('/auth/')
    if (err.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('basudevbnb_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
