import React, { useState } from 'react';
import { Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch {
            if (error.code) {
                setError(error.message);
            } else {
                // Handle other errors (e.g., network issues)
                setError('An error occurred during logout. Please try again.');
            }
        }

        if (error.code) {
            setError(error.message);
            } else {
                // Handle other errors (e.g., network issues)
                setError('An error occurred during logout. Please try again.');
            }
            
    }


    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>My Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <strong>Email: </strong>{currentUser.email}
                        <Link to="/update-profile" className='btn btn-secondary w-100 mt-3'>Update Profile</Link>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Button variant='link' onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </Container>
    )
}
