import { GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

import '../css/registryPage.css';

export function CustomGoogleRegistry() {
  const { googleRegister } = useGoogleAuth();

  const handleGoogleRegister = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;
    try {
      await googleRegister(googleToken);
    } catch (error) {
      console.error('Error in Google Registration:', error.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleRegister}
      onError={() => {
        console.error('Error in Google Registration');
      }}
    />
  );
}
