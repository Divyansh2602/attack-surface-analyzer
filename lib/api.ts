import axios from 'axios'
import { useAuthStore } from './store'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (username: string, password: string) =>
    api.post('/register', { username, password }),
  login: (username: string, password: string) =>
    api.post('/login', { username, password }),
}

export const scanAPI = {
  startScan: (target: string) =>
    api.post('/scan', { target }),
  getScanStatus: (scanId: number) =>
    api.get(`/scan/${scanId}`),
  getScanResults: (scanId: number) =>
    api.get(`/scan/${scanId}`),
  getScans: () =>
    api.get('/scans'),
  generateReport: (scanId: number) =>
    api.get(`/report/${scanId}`),
}

export const phishingAPI = {
  checkPhishing: (url: string) =>
    api.post('/phishing/check', null, { params: { url } }),
}

export const dashboardAPI = {
  getDashboard: () =>
    api.get('/dashboard'),
}

export default api
