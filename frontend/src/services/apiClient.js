import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sentinel_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Auto-logout on 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('sentinel_token')
      localStorage.removeItem('sentinel_user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  register: (data) => apiClient.post('/auth/register', data),
  login:    (data) => apiClient.post('/auth/login', data),
}

export const configApi = {
  getAll:  ()         => apiClient.get('/configs'),
  create:  (data)     => apiClient.post('/configs', data),
  update:  (id, data) => apiClient.put(`/configs/${id}`, data),
  delete:  (id)       => apiClient.delete(`/configs/${id}`),
  toggle:  (id)       => apiClient.patch(`/configs/${id}/toggle`),
}

export const dashboardApi = {
  getStats: () => apiClient.get('/dashboard/stats'),
}

export default apiClient
