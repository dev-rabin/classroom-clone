import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link, NavLink, Navigate } from "react-router-dom";
import Drawer from "./drawer"; // Assuming you have a Drawer component
import { useAuth } from "../store.js/auth";

function NavbarPage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <span className="drawer-toggle">
            <Drawer />
          </span>
          <NavLink to="/">Classroom</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">

          <Link to="/joinclass"><Button variant="primary">JoinClass</Button></Link>
          {/* <Navbar.Text>
            Signed in as: <b>{user ? user.userData.name : isLoggedIn}</b>
          </Navbar.Text> */}
          <Navbar.Text className="navlink">
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
