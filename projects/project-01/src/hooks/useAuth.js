import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useCallback } from 'react'

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    queryClient.removeQueries(['user'])
    navigate('/') //TODO: Check where to redirect after logout
  }, [queryClient, navigate])

  const getCurrentUser = useCallback(() => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null

      const decodedToken = jwtDecode(token)
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

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const { token } = await authService.login(credentials)
      localStorage.setItem('token', token)
      const user = getCurrentUser()
      return { token, user }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
      navigate('/') //TODO: Check where to redirect after login
    },
    onError: (error) => {
      handleLogout()
      throw error
    }
  })

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

  const logoutMutation = useMutation({
    mutationFn: () => handleLogout()
  })

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