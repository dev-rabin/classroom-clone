import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Drawer from "./Drawer"; // Assuming you have a Drawer component
import { useAuth } from "../store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./widgets.css";

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

          <div className="dropdown-secondry">
          <FontAwesomeIcon icon={faPlus} fontSize="20px" className="mt-1 mx-3 bg-secondary p-3 rounded-circle text-white"/>
          <div className="dropdown-content-secondry">
         <NavLink to="/joinclass" className="text-decoration-none text-dark">Join Class</NavLink>
         <NavLink to="/createClass" className="text-decoration-none text-dark">Create Class</NavLink>
          </div>
          </div>
          <Navbar.Text>
            Signed in as: <b>{user ? user.name : isLoggedIn}</b>
          </Navbar.Text>
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
