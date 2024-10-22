import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { register, isLoading, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    register({ username, email, password })
  }

  //TODO: Add validation
  //For now the error(s) is/are displayed directly, we have to handle it better
  // the message of error is the message response of the api, but if we handle the
  // error here in the frontend, the api should not even be able to receive invalid parameters
  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error.message}</div>}
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Register'}
      </button>
    </form>
  )
}