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

