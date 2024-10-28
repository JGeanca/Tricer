
import { Link } from 'react-router-dom'
import { RegistryForm } from '../components/RegistryForm'
import { useState, useEffect } from 'react'
import { CustomGoogleRegistry } from '../components/GoogleRegistry'

import '../css/registryPage.css'
export default function RegisterPage() {

  const [isLargeScreen, setIsLargeScreen] = useState(true)

  useEffect(() => {
    const updateSizeSetting = () => {
      if (window.innerWidth <= 1000) {
        setIsLargeScreen(false)
      } else {
        setIsLargeScreen(true)
      }
    }

    window.addEventListener('resize', updateSizeSetting)
    updateSizeSetting()

    return () => window.removeEventListener('resize', updateSizeSetting)
  }, [])

  return (
    <div className="register-page">
      <div className={`registry-section  ${isLargeScreen ? 'setting-complete' : ''}`}>
        <Link to="/" className="registry-title">
          Tricer
        </Link>
        <RegistryForm />
        <hr className="registry-separator-line" />
        <CustomGoogleRegistry />
      </div>
      <div className={`registry-login-section ${isLargeScreen ? 'setting-complete' : ''}`} >
        Already have an account?
        <Link to="/login" className="log-in">
          Log in
        </Link>
      </div>
    </div>
  )
}