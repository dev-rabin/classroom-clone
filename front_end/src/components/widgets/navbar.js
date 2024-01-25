import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "../App.css";
import Drawer from "./drawer";
import { useAuth } from "../store.js/auth";

function NavbarPage() {
  const { isLoggedIn,student } = useAuth();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        {/* <Button variant='none'><span class="navbar-toggler-icon fs-5"></span></Button> */}
        <Drawer />
        <NavLink to="/">
          <Navbar.Brand>Classroom</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:
             <b>{student ? student.studentData.name : isLoggedIn}</b>
          </Navbar.Text>
          <Navbar.Text>
            {isLoggedIn ? (
              <NavLink to="/logout" className="mx-3">
                Logout
              </NavLink>
            ) : (
              <>
                <NavLink to="/login" className="mx-3">
                  Login
                </NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
