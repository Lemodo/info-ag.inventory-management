import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()

        //error handling
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('The passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
                .catch(error => {
                    switch (error.code) {
                        case 'auth/operation-not-allowed':
                            setError('Account creation failed. Try again later. #0001')
                            break;
                        case 'auth/invalid-email':
                            setError('The email is faulty.')
                            break;
                        case 'auth/invalid-password':
                            setError('The password is faulty.')
                            break;
                        case 'auth/weak-password':
                            setError('The password should be at least 6 characters. #0004')
                            break;
                        default:
                            setError(error.message)
                            break;
                    }
                })
        } catch (e) {
            setError(e)
        } //whole if&try-catch to provide a fitting error code, ty firebase

        setLoading(false)
        
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Create your account</h2>
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
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type='password' ref={passwordConfirmRef} required></Form.Control>
                                </Form.Group>
                                <Button className="w-100 mt-3" type='submit' disabled={loading}>Create account</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        Already have an account? Login
                    </div>
                </div>
            </Container>
        </>
    )
}
