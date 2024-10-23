import { Link } from 'react-router-dom'
import HomeWomen from '../assets/imgs/home_women.svg'
import HomeMen from '../assets/imgs/home_men.svg'
import { LoginForm } from '../components/LoginForm'
import { GoogleIcon } from '../assets/Icons'
import { useState, useEffect } from 'react'

import '../css/loginPage.css'

export default function Login() {

    const [showDecoration, setShowDecoration] = useState(true)

    useEffect(() => {
        const updateShowDecoration = () => {
           if (window.innerWidth <= 1000) {
               setShowDecoration(false)
            } else {
               setShowDecoration(true)
            }
        }

        window.addEventListener('resize', updateShowDecoration)
        updateShowDecoration()

        return () => window.removeEventListener('resize', updateShowDecoration)
    }, [])

    return (
        <div className="login-page">
            {
                showDecoration && (
                    <div className="images-section">
                        <img src={HomeWomen} alt="Women" className="upper-image" />
                        <img src={HomeMen} alt="Men" className="lower-image" />
                    </div>
                )
            }
            <div className={`user-section ${!showDecoration ? 'user-section-complete' : ''}`}>
                <div className="login-section">
                    <div className="login-title">
                        Tricer
                    </div>
                    <LoginForm />
                    <hr className="separator-line" />
                    <div className="login-lower-section">
                        <div className="login-google-group">
                            <GoogleIcon width="24" height="24"/>
                            <Link to="/login-google" className="login-google">
                                Log in with Google
                            </Link>
                        </div>
                        <Link to="/password/reset" className="forget-password">
                            Forget the password?
                        </Link>
                    </div>
                </div>
                <div className="register-section">
                    Don't have an account?
                    <Link to="/signup" className="sign-up">
                        Sing up
                    </Link>
                </div>
            </div>
        </div>
    )
}