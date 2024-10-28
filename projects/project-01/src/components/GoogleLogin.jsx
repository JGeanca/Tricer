import { useGoogleLogin } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleAuth } from '../hooks/useGoogleAuth'

import '../css/loginPage.css'

export function CustomGoogleLogin() {
  const { googleLogin } = useGoogleAuth();

  const handleGoogleLogin = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    try {
      await googleLogin(googleToken)
    } catch (error) {
      console.error('Error in Google Login:', error.message)
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        console.error('Error in Google Login');
      }}
    />
  )
}