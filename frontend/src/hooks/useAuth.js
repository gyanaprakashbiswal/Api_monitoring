import { useState, useCallback } from 'react'
import { authApi } from '../services/apiClient'

const TOKEN_KEY = 'sentinel_token'
const USER_KEY  = 'sentinel_user'

export function useAuth() {
  const [user, setUser]       = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch { return null }
  })
  const [token, setToken]     = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const saveSession = useCallback((data) => {
    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY,  JSON.stringify({ username: data.username }))
    setToken(data.token)
    setUser({ username: data.username })
  }, [])

  const login = useCallback(async (username, password) => {
    setLoading(true); setError(null)
    try {
      const res = await authApi.login({ username, password })
      saveSession(res.data)
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      return false
    } finally { setLoading(false) }
  }, [saveSession])

  const register = useCallback(async (username, password) => {
    setLoading(true); setError(null)
    try {
      await authApi.register({ username, password })
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      return false
    } finally { setLoading(false) }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }, [])

  return { user, token, loading, error, login, register, logout, isAuthenticated: !!token }
}
