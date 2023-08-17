import React from 'react';
import Sidebar from './Sidebar'; // Adjust the path accordingly
import { Container, Row, Col, Card } from 'react-bootstrap'

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
                      Card 1 showing a few stats
                    </Card.Body>
                  </Card>
                </div>
              </Container>
            </Col>
            <Col>
              <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ overflow: "hidden" }}>
                  <Card>
                    <Card.Body>
                      Database records in total
                    </Card.Body>
                  </Card>
                </div>
              </Container>
            </Col>
            <Col>
              <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ overflow: "hidden" }}>
                  <Card>
                    <Card.Body>
                      Another card for some stats
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