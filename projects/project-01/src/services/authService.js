import { publicApi } from './apiConfig'

export const authService = {

  //*For now we will use local storage, but cookies are a better option 
  // because they are more secure and can be used for server-side rendering

  async login({ username, password }) {
    try {
      const response = await publicApi.post('users/login', { username, password })
      const { token } = response.data
      if (!token) throw new Error('No token received from server')
      return { token }
    } catch (error) {
      if (!error.response) throw error
      if (error.response?.data) throw { message: error.response.data.message }
      throw error
    }
  },

  async register({ username, email, password }) {
    try {
      const response = await publicApi.post('users/register', { username, email, password })
      return response.data
    } catch (error) {
      if (!error.response) throw error

      const { status, data } = error.response
      if ([422, 409].includes(status)) throw { status, message: data.message, errors: data.errors }

      throw error
    }
  },

  isTokenExpired(decodedToken) {
    if (!decodedToken.exp) return true
    const expirationTime = decodedToken.exp * 1000
    return Date.now() >= expirationTime
  },
}
