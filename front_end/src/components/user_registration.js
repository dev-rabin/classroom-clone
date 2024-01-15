import Form from 'react-bootstrap/Form';
import SignUpImage from '../images/sign-up.png';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import axios  from "axios";

const UserRegistration =() =>{
    const [formData, setFormData] = useState({
        user_type : "",
        name : "",
        email: "",
        password: "",
        roll_no : "",
    });

    const hadleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/createAccount', formData);
            console.log(response.data);
            console.log('Robin');
        } catch (error) {
            console.error(error.message);
        }
    }
return (
    <>
    <h1 className='text-center mt-3'>Register Here</h1>
    <div className="container registration my-3 p-3 d-flex justify-content-around">
        
        <div className="col-lg-5 my-3 col-md-5 align-items-center" >
            <Form  >
                <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput1">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Teacher or Student" name='user_type' value={formData.user_type} onChange={hadleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" name='name' value={formData.name} onChange={hadleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" name='email' value={formData.email} onChange={hadleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" name='password' value={formData.password} onChange={hadleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput5">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter your roll number" name='roll_no' value={formData.roll_no} onChange={hadleInputChange}/>
                </Form.Group>
                <Button variant="success" type='submit' onSubmit={handleFormSubmit}>Register</Button>
            </Form>
            </div>
            <div className='col-lg-5 col-md-5'><img className='img-fluid' src={SignUpImage} alt='Not available'/></div>
            </div>
            
    </>
)
}

export default UserRegistration;