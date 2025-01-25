import axios from 'axios'
import { API_BASE_URL } from '../config'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'



// Public instance - for routes that do not require authentication
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Private instance - for routes that require authentication
export const privateApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor for privateApi to add the token to requests
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor to handle 401(unauthorized) errors
privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.replace('/login')
    }
    return Promise.reject(error) // Reject the promise with the error
  }
)
