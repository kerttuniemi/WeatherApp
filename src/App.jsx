import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './Home';
import Weather from './Weather';
import Search from './Search';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navbar bg="" variant="dark" expand="lg">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/" style={{fontSize: "28px", color: "#34666f"}} >Weather Now</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" style={{fontSize: "20px", color: "#fbe8d9"}} >Home</Nav.Link>
              <Nav.Link as={Link} to="/search" style={{fontSize: "20px", color: "#fbe8d9"}}>Search</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
