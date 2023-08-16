import React from 'react';
import Sidebar from './Sidebar'; // Adjust the path accordingly
import { Container, Row, Col, Card } from 'react-bootstrap'
import Database from './Database';

export default function Dashboard() {

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <main> 
        <Container>
          <Row>
            <Col>
              <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ overflow: "hidden" }}>
                  <Card>
                    <Card.Body>
                      <Database />
                    </Card.Body>
                  </Card>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}