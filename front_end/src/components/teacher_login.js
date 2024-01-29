import Form from "react-bootstrap/Form";
import LoginImage from "../images/sign-up.png";
import Button from "react-bootstrap/Button";
import { useState} from "react";
import { useAuth } from "./store.js/auth";
import { NavLink, useNavigate } from "react-router-dom";

const TeacherLogin = () => {
    const {storeToken} = useAuth();
    const navigate = useNavigate();
    const [teacherLogin, setTeacherLogin] = useState({
        email : "",
        password : ""
    });

    const handleInputChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setTeacherLogin({
            ...teacherLogin,
            [name] : value,
        })
    }

    const handleTeacherLogin =  async() => {
        try {
            const response = await fetch("http://localhost:4000/api/teacherlogin", {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacherLogin)
    });
    console.log(response);
    if (response.ok) {
        const response_data = await response.json();
        storeToken(response_data.token);
        alert('Login Successful');
        setTeacherLogin({ email: "", password: "" });
        navigate("/");
        console.log("log in");
    }
    else {
        alert('Invalid Credentials');
        console.error("Login failed:", response.statusText);
        } }
         catch (error) {
            console.error("Error During Login!", error.message);
            alert('Login Failed');
        }
    }
  return (
    <>
      <div className="container col-lg-12 col-md-12 my-5 ">
        <div className="container my-4 registration d-flex justify-content-center">
          <div className="col-lg-5 col-md-5 m-auto">
            <h3 className="text-left">Welcome to Classroom Clone</h3>
            <Form.Group
              className="my-3 col-lg-12 col-md-12"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={teacherLogin.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-lg-12 col-md-12"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={teacherLogin.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" onClick={handleTeacherLogin}>
              Login
            </Button>
            <NavLink className="mx-3 text-decoration-none" to="/registerteacher">
              Teacher Register Here
            </NavLink>
          </div>
          <div className="col-lg-5 col-md-5">
            <img className="img-fluid" src={LoginImage} alt="Not available" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherLogin;
