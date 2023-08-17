import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'
import React from 'react'
import { Modal, Button, Form, Col, Row, FloatingLabel } from "react-bootstrap"
 
export default function MyCreateModal(props) {
    const { currentUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handling submit")
        axios.post(process.env.REACT_APP_API+'create', {
            product_name: "test",
            description: 'test2',
            quantity: "1",
            location: "jere",
            last_updated_user: currentUser.email,
            created_by: currentUser.email
          })
          .then(function (response) {
            console.log(response);
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
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Create new entry
      </Modal.Title>
    </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
            <Form.Group className="mt-4" id="name">
                <FloatingLabel controlId="floatingName" label="Name">
                    <Form.Control type="name" placeholder="Name" required/>
                </FloatingLabel>
            </Form.Group>
            <Row>
            <Col>
                <Form.Group className="mt-4" id="quantity">
                    <FloatingLabel controlId="floatingQuantity" label="Quantity">
                        <Form.Control type="quantity" placeholder="Quantity" required/>
                    </FloatingLabel>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mt-4" id="location">
                    <FloatingLabel controlId="floatingLocation" label="Location">
                        <Form.Control type="location" placeholder="Location" required/>
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
