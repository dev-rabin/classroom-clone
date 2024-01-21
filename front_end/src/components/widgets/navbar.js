import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import  Button  from 'react-bootstrap/Button';
import { NavLink} from 'react-router-dom';
import '../App.css';
function NavbarPage() {


  return (
    <Navbar className="bg-body-tertiary">
      <Container>
      <Button variant='none'><span class="navbar-toggler-icon fs-5"></span></Button>
       <NavLink to="/"><Navbar.Brand>Classroom</Navbar.Brand></NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Robin</a>
          </Navbar.Text>
          <Navbar.Text>
            <NavLink to = "/login" className="mx-3">Log Out</NavLink>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;