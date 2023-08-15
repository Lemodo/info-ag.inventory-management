import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault()

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/")
        } catch (error) {
            // Handle Firebase authentication errors
            if (error.code) {
                switch (error.code) {
                    case 'auth/operation-not-allowed':
                        setError('Operation not allowed. Try again later. #0001');
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        setError('Incorrect login details.');
                        break;
                    default:
                        setError(error.message);
                        break;
                }
            } else {
                // Handle other errors (e.g., network issues)
                setError('An error occurred during login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Log In</h2>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' ref={emailRef} required></Form.Control>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' ref={passwordRef} required></Form.Control>
                                </Form.Group>
                                <Button className="btn-secondary w-100 mt-3" type='submit' disabled={loading}>
                                    {loading ? 'Logging In...' : 'Log In'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}
