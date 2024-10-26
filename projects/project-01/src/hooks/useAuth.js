import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useCallback } from 'react'

// *NOTE: React Query == TanStack

/**
 * Custom hook that manages authentication state and operations
 * Uses React Query for state management and caching
 * @returns {Object} Authentication methods and state
 */
export const useAuth = () => {
  const navigate = useNavigate()

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
      navigate('/') //TODO: Check where to redirect after login
    },
    onError: (error) => {
      handleLogout()
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
      navigate('/') // TODO: Check where to redirect after register
    },
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
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  })

  return {
    user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error
  }
}