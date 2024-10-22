import { publicApi } from './apiConfig'
import { jwtDecode } from 'jwt-decode'

export const authService = {

  //*For now we will use local storage, but cookies are a better option 
  // because they are more secure and can be used for server-side rendering

  async login({ username, password }) {
    try {
      const response = await publicApi.post('users/login', { username, password })

      const { token } = response.data
      if (!token) throw new Error('No token received from server')

      localStorage.setItem('token', token)
      return {
        token,
        user: this.getCurrentUser()
      }
    } catch (error) {
      localStorage.removeItem('token')
      throw error
    }
  },

  async register({ username, email, password }) {
    const response = await publicApi.post('users/register', { username, email, password })
    return response.data
  },

  async logout() {
    localStorage.removeItem('token')
  },

  getCurrentUser() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null

      const decodedToken = jwtDecode(token)
      if (this.isTokenExpired(decodedToken)) {
        this.logout()
        return null
      }
      return decodedToken
    } catch (error) {
      console.error('Error getting current user:', error)
      this.logout()
      return null
    }
  },

  isTokenExpired(decodedToken) {
    if (!decodedToken.exp) return true
    const expirationTime = decodedToken.exp * 1000
    return Date.now() >= expirationTime
  },

  getToken() {
    return localStorage.getItem('token')
  },

  isAuthenticated() {
    return this.getCurrentUser() !== null
  }
}
