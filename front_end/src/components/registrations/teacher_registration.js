import Form from "react-bootstrap/Form";
import SignUpImage from "./sign-up.png";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store.js/auth";
const TeacherRegistation = () => {
    const navigate = useNavigate();
    const {storeToken} = useAuth();
  const [teacher, setTeacher] = useState({ 
    name: "", email: "", password: "" });

    const hadleInputChange = (e) => {
        setTeacher({...teacher, [e.target.name]: e.target.value})
    }

    const registerTeacher = async() => {
        try {
            const response = await fetch("http://localhost:4000/api/registerteacher" , {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body : JSON.stringify(teacher),
            });
            if (response.ok) {
                const responseData = await response.json();
                storeToken(responseData.token);
                setTeacher({
                    name : "",
                    email : "",
                    password : ""
                });
                alert("You registred as teacher");
                navigate("/");
                console.log("Registred registered successfully");
            } else {
                const errorData = await response.json();
                console.error("Error during registration: ", errorData.message);
                alert(errorData.message);
            }
        } catch (error) {
            console.log("Error during registration ", error);
        }
    }
  return (
    <>
      <div className="container col-lg-12 col-md-12 my-5 registration d-flex justify-content-center">
        <div className="col-lg-5 col-md-5 align-items-center">
          <h3 className="mt-5">Register Here As a Teacher</h3>
          <Form.Group
            className="mb-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teacher name"
              name="name"
              value= {teacher.name}
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
              value={teacher.email}
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
              placeholder="Password"
              name="password"
              value={teacher.password}
              onChange={hadleInputChange}
            />
          </Form.Group>
          <Form.Group
            className="my-3 col-lg-12 col-md-12"
            controlId="exampleForm.ControlInput5"
          ></Form.Group>
          <Button className="my-3" variant="success" type="submit" onClick={registerTeacher}>
            Register
          </Button>
          <NavLink to="/loginteacher" className="login">
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

export default TeacherRegistation;
