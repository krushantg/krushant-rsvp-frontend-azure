javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import SubmitRSVP from './pages/SubmitRSVP';
import ViewRSVP from './pages/ViewRSVP';

function App() {
  return (
    <Router>
      <Navbar bg="dark" expand="lg" sticky="top" className="mb-4">
        <Container>
          <Navbar.Brand href="/">
            <strong>Krushant's New Years Party 2025</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/submit-rsvp">Submit RSVP</Nav.Link>
              <Nav.Link href="/view-rsvp">View RSVP</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit-rsvp" element={<SubmitRSVP />} />
        <Route path="/view-rsvp" element={<ViewRSVP />} />
      </Routes>
    </Router>
  );
}

export default App;