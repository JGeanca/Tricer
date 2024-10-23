//import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
//import { useAuth } from '../hooks/useAuth'

//import '../css/loginForm.css'

//export function LoginForm() {
//  const [email, setEmail] = useState('')
//  const [password, setPassword] = useState('')
//  const { login } = useAuth()
//  const navigate = useNavigate()

//  const handleSubmit = async (e) => {
//    e.preventDefault()
//    try {
//      await login(email, password)
//      navigate('/')
//    } catch (error) {
//      // TODO: Show a proper error message to the user
//      console.error('Login failed', error)
//    }
//  }

//  return (
//    <form onSubmit={handleSubmit} className="login-form">
//      <input className="email-form"
//        type="email"
//        value={email}
//        onChange={(e) => setEmail(e.target.value)}
//        placeholder="Email"
//        required
//      />
//      <input className="password-form"
//        type="password"
//        value={password}
//        onChange={(e) => setPassword(e.target.value)}
//        placeholder="Password"
//        required
//      />
//      <button type="submit" className="login-button-form">Login</button>
//    </form>
//  )
//}


//import { useState } from 'react'
//import { useAuth } from '../hooks/useAuth'

//export function LoginForm() {
//    const [username, setUsername] = useState('')
//    const [password, setPassword] = useState('')
//    const { login, isLoading, error } = useAuth()

//    const handleSubmit = async (e) => {
//        e.preventDefault()
//        login({ username, password })
//    }

//    //TODO: Add validation
//    //For now the error(s) is/are displayed directly, we have to handle it better
//    // the message of error is the message response of the api, but if we handle the
//    // error here in the frontend, the api should not even be able to receive invalid parameters
//    return (
//        <form onSubmit={handleSubmit}>
//            {error && <div>{error.message}</div>}
//            <input
//                type="username"
//                value={username}
//                onChange={(e) => setUsername(e.target.value)}
//                placeholder="username"
//                required
//            />
//            <input
//                type="password"
//                value={password}
//                onChange={(e) => setPassword(e.target.value)}
//                placeholder="Password"
//                required
//            />
//            <button type="submit" disabled={isLoading}>
//                {isLoading ? 'Loading...' : 'Login'}
//            </button>
//        </form >
//    )
//}


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../css/loginForm.css'
export function LoginForm() {
    return (
        <Form className="login-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control className="email-form" onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="Email or Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control className="password-form" onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check className="remember-checkbox" onChange={(e) => setRemeberMe(e.target.value)}
                    type="checkbox" label="Remember me" />
            </Form.Group>

            <Button type="submit" className="login-button-form">
                Login
            </Button>
        </Form>
    )
}

