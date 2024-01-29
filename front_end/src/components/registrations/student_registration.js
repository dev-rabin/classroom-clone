import Form from "react-bootstrap/Form";
import SignUpImage from "./sign-up.png";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../store.js/auth";
const StudentRegistration = () => {
  const navigate = useNavigate();
  const {storeToken} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
  });
  const hadleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const registerUser = async () => {
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
          rollNo: "",
        });
        alert("You are registered")
        navigate("/");
        console.log("User registered successfully");
      } else {
        // Handle registration failure (e.g., duplicate entry, validation error)
        const errorData = await response.json();
        console.error("Error during registration: ", errorData.message);
        // Optionally, you can set state to show an error message to the user
        alert(errorData.message);
      }
    } catch (error) {
      console.log("Error during registration ", error);
    }
  };
  return (
    <>
      <div className="container col-lg-12 col-md-12 my-5 registration d-flex justify-content-center">
        <div className="col-lg-5 col-md-5 align-items-center">
          <h3 className="mt-5">Register Here</h3>
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

          <Form.Group
            className="my-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput5"
          >
            <Form.Label>Roll No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Roll No."
              name="rollNo"
              value={formData.rollNo}
              onChange={hadleInputChange}
            />
          </Form.Group>
          <Button
            className="my-3"
            variant="success"
            type="submit"
            onClick={registerUser}
          >
            Register
          </Button>
          <NavLink to="/login" className="login">
            Login Here
          </NavLink>
        </div>
        <div className="col-lg-5 col-md-5">
          <img className="img-fluid" src={SignUpImage} alt="Not available" />
        </div>
      </div>
    </>
  );
};

export default StudentRegistration;
