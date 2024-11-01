import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../hooks/useAuth'
import { useFeedback } from '../hooks/useFeedback'

import '../css/registryPage.css'

export function GoogleAuthButton() {
  const { googleAuthorization } = useAuth()
  const { showError, showSuccess } = useFeedback()

  const handleGoogleRegister = async (credentialResponse) => {
    const googleToken = credentialResponse.credential
    try {
      await googleAuthorization(googleToken)
      showSuccess('Google authorization successful')
    } catch (error) {
      console.error('Error in Google authorization:', error.message)
      showError('Google login failed')
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleGoogleRegister}
      onError={() => {
        console.error('Error in Google authorization')
      }}
    />
  )
}
