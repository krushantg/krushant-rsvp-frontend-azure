javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function SubmitRSVP() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    numberOfGuests: 0,
    rsvpStatus: 'Yes'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value) : value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!formData.email.trim()) return 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Valid email is required';
    
    if (formData.numberOfGuests < 0 || formData.numberOfGuests > 5) {
      return 'Number of guests must be between 0 and 5';
    }
    if (!['Yes', 'No'].includes(formData.rsvpStatus)) {
      return 'Please select Yes or No for RSVP';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${API_URL}/api/rsvp/submit`, formData);
      setMessage(response.data.message);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting RSVP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <div className="col-md-6 mx-auto">
        <h2 className="mb-4">Submit Your RSVP</h2>
        
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>How many people will join you?</Form.Label>
            <Form.Select
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              required
            >
              <option value="0">0 guests</option>
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5 guests</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Will you join us?</Form.Label>
            <Form.Select
              name="rsvpStatus"
              value={formData.rsvpStatus}
              onChange={handleChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit RSVP'}
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default SubmitRSVP;