//* Here, in this service, all operations related to authentication will be handled.

const API_URL = 'https://rayomakuin.example.com'  // TODO

export const authService = {

  // Login // TODO -- Check THIS
  async login(email, password) {
    // Fetch the user from the API
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }) //TODO TRY CATCH
    if (!response.ok) {
      throw new Error('Login failed')
    }
    const data = await response.json()
    //TODO -- Check if we want to use local storage or cookies
    //!For now we will use local storage
    localStorage.setItem('token', data.token)
    return data.user
  },

  // Register // TODO -- Check THIS
  async register(email, password) {
    // Fetch the user from the API with a post request
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }) //TODO TRY CATCH
    if (!response.ok) {
      throw new Error('Registration failed')
    }
    const data = await response.json()
    localStorage.setItem('token', data.token)  //TODO CHECK
    return data.user
  },

  logout() { //? Logout with local storage for now
    localStorage.removeItem('token')
    //? redirect to login page?
  },

  getCurrentUser() {
    const token = localStorage.getItem('token')
    if (!token) return null
    // TODO USE JWT to get the user info from the token
    //! For now, we will return a mock user
    return { id: 1, email: 'gean@example.com' }
  },

  getToken() { // Still using local storage
    return localStorage.getItem('token')
  }
}

//!List of important things by Gean:

//TODO USE API When we have it
//TODO USE JWT to get the user info from the token -> JWT is a way to encode the user info in the token
//TODO TRY CATCH -> Handle errors
//TODO FOR NOW we will use local storage for the token, but we could use cookies, is more secure and recommended
//TODO WE CAN SIMPLiFY This with AXIOS library -> Check it out  

//* CHECK: https://jwt.io/  -> JWT is very common!!!
