import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const transformError = (error) => {
    if (error.response?.status === 422) {
      const validationErrors = error.response.data.errors
      error.message = validationErrors
        .map(err => err.message)
        .join('-')
    } else if (error.response?.data?.message) {
      error.message = error.response.data.message
    }
    return error
  }

  const loginMutation = useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user)
      navigate('/') // Check where to redirect after login
    },
    onError: (error) => {
      if (error.response?.data.message) {
        error.message = error.response.data.message
      }
      return error
    }
  })

  const registerMutation = useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: () => {
      navigate('/login')
    },
    onError: transformError
  })

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries(['user'])
      navigate('/') //TODO: Check where to redirect after logout
    }
  })

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false
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