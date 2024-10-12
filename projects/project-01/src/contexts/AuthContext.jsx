import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

// This is for managing the user's authentication state in the application
//* This is the native way to create a context in React
// TODO we can simplify this using Zustand

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = authService.getCurrentUser()
    setUser(user)
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const user = await authService.login(email, password)
    setUser(user)
  }

  const register = async (email, password) => {
    const user = await authService.register(email, password)
    setUser(user)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}