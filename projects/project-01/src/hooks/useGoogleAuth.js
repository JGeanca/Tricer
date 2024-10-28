import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { useFeedback } from '../hooks/useFeedback.jsx';

export const useGoogleAuth = () => {
  const navigate = useNavigate()
  const { showError, showSuccess } = useFeedback()

  const googleLoginMutation = useMutation({
    mutationFn: async (googleToken) => {
      const { token } = await authService.loginWithGoogle(googleToken)
      localStorage.setItem('token', token)
      const user = jwtDecode(token)
      return user
    },
    onSuccess: (user) => {
      console.log('Login with Google successful', user)
      showSuccess('Login successful')
      navigate('/')
    },
    onError: (error) => {
      console.error('Error with the Google login:', error.message)
      showError('Google login failed')
    }
  })

  return {
    googleLogin: googleLoginMutation.mutate
  }
}
