import Form from "react-bootstrap/Form";
import SignUpImage from "./sign-up.png";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../components/App.css";
import { useAuth } from "../store/auth";
import { Alert } from "react-bootstrap";

const UserRegistration = () => {
  const navigate = useNavigate();
  const {storeToken} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const hadleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [error,setError] = useState("");

  const registerUser = async () => {
    if (!formData.email.trim() || !formData.name.trim() || !formData.password) {
      setError("Please fill all details!");
      return;
    }
    if (!formData.password.length < 6) {
      setError("Password should be at least 6 characters long!");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const response_data = await response.json();
        storeToken(response_data.token);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        alert("You are registered")
        navigate("/login");
        console.log("User registered successfully");
      } else {
        const errorData = await response.json();
        console.error("Error during registration: ", errorData.message);
        alert(errorData.message);
      }
    } catch (error) {
      console.log("Error during registration ", error);
    }
  };
  return (
    <>
      <div className="container col-lg-12 col-md-12 my-1 registration d-flex justify-content-center">
        <div className="col-lg-5 col-md-5 align-items-center my-5">
          <h3 className="my-4">Register Here</h3>
          <Form.Group
            className="mb-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={hadleInputChange}
            />
          </Form.Group>

          <Form.Group
            className="my-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput3"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={formData.email}
              onChange={hadleInputChange}
            />
          </Form.Group>

          <Form.Group
            className="my-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput4"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={hadleInputChange}
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button
            className="my-2"
            variant="success"
            type="submit"
            onClick={registerUser}
          >
            Register
          </Button>
          <NavLink to="/login" className="login">
           <Button variant="dark" className="mx-2">Login</Button>
          </NavLink>
        </div>
        <div className="col-lg-5 col-md-5">
          <img className="img-fluid" src={SignUpImage} alt="Not available" />
        </div>
      </div>
    </>
  );
};

export default UserRegistration;
