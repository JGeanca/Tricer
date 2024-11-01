import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { jwtDecode } from 'jwt-decode'
import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


// *NOTE: React Query == TanStack

/**
 * Custom hook that manages authentication state and operations
 * Uses React Query for state management and caching
 * @returns {Object} Authentication methods and state
 */
export const useAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // React Query's client to manage server state
  const queryClient = useQueryClient()

  /**
  * Handles user logout by clearing token and auth state
  * Memoized with useCallback to prevent unnecessary re-renders
  */
  const handleLogout = useCallback(() => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token')
    // Clear the user data from React Query cache
    queryClient.removeQueries(['user'], null)
    navigate('/') //TODO: Check where to redirect after logout
  }, [queryClient, navigate])

  /**
   * Gets the current user from the stored JWT token
   * Validates token expiration and decodes user data
   * @returns {Object|null} Decoded user data or null if no valid token
   */
  const getCurrentUser = useCallback(() => {
    try {
      // Get token from local storage
      const token = localStorage.getItem('token')
      if (!token) return null

      // Decode the JWT token to get user data
      const decodedToken = jwtDecode(token)
      // Check if token is expired
      if (authService.isTokenExpired(decodedToken)) {
        handleLogout()
        return null
      }
      return decodedToken
    } catch (error) {
      console.error('Error getting current user:', error)
      handleLogout()
      return null
    }
  }, [handleLogout])


  /**
   * Mutation hook for handling login operations
   * Manages the async state of login requests
   */
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { token } = await authService.login(credentials)
      localStorage.setItem('token', token)
      const user = getCurrentUser()
      return { token, user }
    },
    onSuccess: (data) => {
      // Update the user data in React Query cache
      queryClient.setQueryData(['user'], data.user)
    },
    onError: (error) => {
      throw error
    }
  })

  /**
   * Mutation hook for handling user registration
   * Manages the async state of registration requests
   */
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const { token } = await authService.register(userData)
      localStorage.setItem('token', token)
      const user = getCurrentUser()
      return { token, user }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
      const previousPath = location.state?.from?.pathname || '/'
      navigate(previousPath, { replace: true })
    },
  })

  /**
   * Mutation hook for handling Google user authorization
   * Manages the async state of Google authorization requests
   */
  const googleAuthMutation = useMutation({
    mutationFn: async (googleToken) => {
      const { token } = await authService.googleAuthorization(googleToken)
      localStorage.setItem('token', token)
      const user = getCurrentUser()
      return { token, user }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
    },
    onError: (error) => {
      handleLogout()
      throw error
    }
  })

  /**
   * Mutation hook for handling logout operations
   */
  const logoutMutation = useMutation({
    mutationFn: () => handleLogout()
  })

  /**
   * Query hook that manages the current user state
   * Uses staleTime: Infinity to prevent unnecessary refetches
   */
  const { data: user, isLoading: isQueryLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    initialData: getCurrentUser
  })

  const isLoading = loginMutation.isLoading || registerMutation.isLoading || isQueryLoading

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: (credentials) => loginMutation.mutateAsync(credentials),
    register: (credentials) => registerMutation.mutateAsync(credentials),
    googleAuthorization: (credentials) => googleAuthMutation.mutateAsync(credentials),
    logout: logoutMutation.mutate,

    error: loginMutation.error || registerMutation.error
  }
}