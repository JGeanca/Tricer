
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import '../css/registryForm.css'

export function RegistryForm() {
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [acceptPolitics, setAcceptPolitics] = useState(false)
    const { register, isLoading, error } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        register({ username, email, password })
    }

    return (
        <Form className="registry-form" onSubmit={handleSubmit}>
            {error && <div>{error.message} </div>}
            {error?.errors && (error.errors.map((error, index) => <div key={index}>{error.message}</div>))}

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                    className="username-form"
                    onChange={(e) => setUser(e.target.value)}
                    type="text"
                    value={user}
                    placeholder="Username"
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