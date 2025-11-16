javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto text-center">
          <h1 className="mb-4">Krushant's 2025 New Years Party</h1>
          <p className="lead mb-5">Please let us know if you can make it!</p>
          
          <Row>
            <Col md={6} className="mb-3">
              <Link to="/submit-rsvp">
                <Button variant="primary" size="lg" className="w-100">
                  Submit RSVP
                </Button>
              </Link>
            </Col>
            <Col md={6} className="mb-3">
              <Link to="/view-rsvp">
                <Button variant="success" size="lg" className="w-100">
                  View RSVP
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;