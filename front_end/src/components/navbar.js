import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../App.css';
function NavbarPage() {
  return (
    <Navbar expand="md" className="navbar bg-success">
      <Container>
        <Navbar.Brand to="/">Classroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/class">Classes</NavLink>
            <NavLink to="/assignments">Assignments</NavLink>
            <NavLink to="/about">About</NavLink>
          </Nav>
          <Nav className="">
            <NavLink to= "/login">Login</NavLink>
            <NavLink to="/logout">Sign Out</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;