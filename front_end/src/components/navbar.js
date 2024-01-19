import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './login';
import { NavLink } from 'react-bootstrap';
function NavbarPage() {
  return (
    <Navbar expand="md" className="navbar bg-success">
      <Container>
        <Navbar.Brand href="#home">Classroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#classes">Classes</Nav.Link>
            <Nav.Link href="#assignments">Assignments</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Nav className="">
            <NavLink to= "/login">Login</NavLink>
            <Nav.Link href="#logout">Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
  );
}

export default NavbarPage;