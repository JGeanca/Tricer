
import { Link } from 'react-router-dom'
import { RegistryForm } from '../components/RegistryForm'
import { GoogleIcon } from '../assets/Icons'
import { useState, useEffect } from 'react'

import '../css/registryPage.css'
export default function RegisterPage() {

    const [bigSetting, setBigSetting] = useState(true)

    useEffect(() => {
        const updateSizeSetting = () => {
            if (window.innerWidth <= 1000) {
                setBigSetting(false)
            } else {
                setBigSetting(true)
            }
        }

        window.addEventListener('resize', updateSizeSetting)
        updateSizeSetting()

        return () => window.removeEventListener('resize', updateSizeSetting)
    }, [])

    return (
        <div className="register-page">
            <div className={`registry-section  ${bigSetting ? 'setting-complete' : ''}`}>
                <div className="registry-title">
                    Tricer
                </div>
                <Link to="/signin-google" className="google-registry-link">
                    <div className="google-icon">
                        <GoogleIcon width="24" height="24"/>
                    </div>
                    Register with Google
                </Link>
                <hr className="registry-separator-line" />
                <RegistryForm />
            </div>
            <div className={`registry-login-section ${bigSetting ? 'setting-complete' : ''}`} >
                Already have an account?
                <Link to="/login" className="log-in">
                    Log in
                </Link>
            </div>
        </div>
    )
}