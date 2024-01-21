import Form from 'react-bootstrap/Form';
import SignUpImage from '../images/sign-up.png';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./App.css";
const UserRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        roll_no: "",
    });
    const hadleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const registerUser = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/createAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.status === 201) {
                console.log(result.message);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.log('Error during registration ', error);
        }
    }
    return (
        <>
            <div className="container col-lg-12 col-md-12 my-5 registration d-flex justify-content-center">
                <div className="col-lg-5 col-md-5 align-items-center" >
                    <h3 className='mt-5'>Register Here</h3>
                    <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" name='name' value={formData.name} onChange={hadleInputChange} />
                    </Form.Group>

                    <Form.Group className="my-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" name='email' value={formData.email} onChange={hadleInputChange} />
                    </Form.Group>

                    <Form.Group className="my-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" name='password' value={formData.password} onChange={hadleInputChange} />
                    </Form.Group>

                    <Form.Group className="my-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput5">
                        <Form.Label>Roll No.</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Roll No." name='roll_no' value={formData.roll_no} onChange={hadleInputChange} />
                    </Form.Group>
                    <Button className='my-3' variant="success" type='submit' onClick={registerUser}>
                        Register
                    </Button>
                    <NavLink to= "/login" className="login">Login Here</NavLink>
                </div>
                <div className='col-lg-5 col-md-5'><img className='img-fluid' src={SignUpImage} alt='Not available' /></div>
            </div>
        </>
    )
}

export default UserRegistration;