import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, FloatingLabel } from "react-bootstrap";

export default function MyCreateModal(props) {
    const { currentUser } = useAuth();

    const [product_name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');

    const handleNameChange = (e) => {
        setProductName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handling submit");

        axios.post(process.env.REACT_APP_API + 'create', {
            product_name,
            description,
            quantity,
            location,
            last_updated_user: currentUser.displayName,
            created_by: currentUser.displayName
        })
        .then(function (response) {
            console.log(response);
            props.onHide(); // Close the modal on successful submission
            window.location.reload(); // Refresh the page
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new entry
                </Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mt-4" id="product_name">
                        <FloatingLabel controlId="floatingName" label="Name">
                            <Form.Control type="name" placeholder="Name" onChange={handleNameChange} required/>
                        </FloatingLabel>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mt-4" id="quantity">
                                <FloatingLabel controlId="floatingQuantity" label="Quantity">
                                    <Form.Control type="number" min="1" placeholder="Quantity" onChange={handleQuantityChange} required/>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mt-4" id="location">
                                <FloatingLabel controlId="floatingLocation" label="Location">
                                    <Form.Control type="location" placeholder="Location" onChange={handleLocationChange} required/>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mt-4" id="description">
                        <FloatingLabel controlId="floatingDescription" label="Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                style={{ height: '100px' }}
                                onChange={handleDescriptionChange}
                                required
                            />
                        </FloatingLabel>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-secondary" type='submit'>
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
