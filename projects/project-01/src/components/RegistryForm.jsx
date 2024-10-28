
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useFeedback } from '../hooks/useFeedback.jsx';

import { Form, Button } from 'react-bootstrap'


import '../css/registryForm.css'

export function RegistryForm() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptPolitics, setAcceptPolitics] = useState(false)
  const { register, isLoading, error } = useAuth()
  const { showError, showSuccess } = useFeedback()

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

  const passwordsMatch = (password, confirmPassword) => password === confirmPassword

  const handleSubmit = async (e) => {
    e.preventDefault()
    let areErrors = false

    if (!validateUsername(user)) {
      showError('Username can only contain letters, numbers and underscores')
    }

    if (!validateEmail(email)) {
      showError('Invalid email format')
      areErrors = true
    }

    if (!validatePassword(password)) {
      showError('Invalid password')
      areErrors = true
    }

    if (!passwordsMatch(password, confirmPassword)) {
      showError('Passwords don\'t match')
      areErrors = true
    }

    if (areErrors) {
      return
    }

    try {
      await register({ username: user, email, password });

      showSuccess('Register successful');

    } catch (err) {
      showError(err.message);
    }
  }

  return (
    <Form className="registry-form" onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Control
          className="username-form"
          onChange={(e) => setUser(e.target.value)}
          type="text"
          value={user}
          placeholder="Username"
          minLength={4}
          maxLength={20}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          className="email-form"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Email"
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

      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Control
          className="confirm-password-form"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          minLength={8}
          maxLength={20}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAcceptPolitics">
        <Form.Check
          className="accept-politics-checkbox"
          onChange={(e) => setAcceptPolitics(e.target.checked)}
          type="checkbox"
          checked={acceptPolitics}
          label="I accept the terms and conditions"
          required
        />
      </Form.Group>

      <Button type="submit" className="register-button-form" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Register'}
      </Button>
    </Form>
  )
}