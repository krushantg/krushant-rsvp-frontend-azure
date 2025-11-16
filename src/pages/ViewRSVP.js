javascript
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

function ViewRSVP() {
  const [email, setEmail] = useState('');
  const [rsvpData, setRsvpData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleLookup = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    setRsvpData(null);

    try {
      const response = await axios.post(`${API_URL}/api/rsvp/lookup`, { email });
      setRsvpData(response.data);
      setMessage('RSVP found!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error looking up RSVP');
      setRsvpData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="col-md-6 mx-auto">
        <h2 className="mb-4">View Your RSVP</h2>
        
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLookup} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Label>Enter your email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Form>

        {rsvpData && (
          <Card>
            <Card.Body>
              <Card.Title>RSVP Information</Card.Title>
              <Card.Text>
                <strong>First Name:</strong> {rsvpData.firstName}<br />
                <strong>Last Name:</strong> {rsvpData.lastName}<br />
                <strong>Email:</strong> {rsvpData.email}<br />
                <strong>Number of Guests:</strong> {rsvpData.numberOfGuests}<br />
                <strong>RSVP Status:</strong> <span className={rsvpData.rsvpStatus === 'Yes' ? 'text-success' : 'text-danger'}>{rsvpData.rsvpStatus}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </Container>
  );
}

export default ViewRSVP;