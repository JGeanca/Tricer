import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import '../css/loginForm.css'

export function LoginForm() {
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loginError, setLoginError] = useState('')
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    return username.length >= 4 && username.length <= 15 && usernameRegex.test(username)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/
    const numberRegex = /[0-9]/
    /*const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/*/
    return (
      password.length >= 8 &&
      password.length <= 20 &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
      /*&& specialCharRegex.test(password)*/
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let errors = ''

    if (!validateUsername(credential) && !validateEmail(credential)) {
      errors = 'Username or email format invalid'
    }

    if (!validatePassword(password)) {
      errors = 'Invalid password'
    }

    setLoginError(errors)
    if (errors) {
      return
    }

    await login({ credential, password })
    const from = location.state?.from?.pathname || '/'
    navigate(from, { replace: true })
  }

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      {error && <div>{error.message}</div>}
      {loginError && <div>{loginError}</div>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          className="email-form"
          onChange={(e) => setCredential(e.target.value)}
          type="credential"
          value={credential}
          placeholder="Email or Username"
          maxLength={35}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          className="password-form"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
          minLength={8}
          maxLength={20}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          className="remember-checkbox"
          onChange={(e) => setRememberMe(e.target.checked)}
          type="checkbox"
          value={rememberMe}
          label="Remember me"
        />
      </Form.Group>

      <Button type="submit" className="login-button-form" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </Form>
  )
}


