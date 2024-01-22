import {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import LoginImage from '../images/sign-up.png';
import Button from 'react-bootstrap/Button';
import {Navigate, NavLink } from 'react-router-dom';
// import UserRegistration from './user_registration';

const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [user, setUser] = useState(null);

        useEffect(() => {
            const storedUser = localStorage.setItem('user',user);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }, []);

        const logout = async () => {
            try {
             
              localStorage.removeItem('user');
              setUser(null);
              console.log("User log out");
            } catch (error) {
              console.error('Logout failed:', error.message);
            }
          };

      const  handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({email, password}),
            });
            console.log(response.body);
        } catch (error) {
            console.error('Error During Login!',error.message);
        }
        }
    return (
        <>
            <div className='container col-lg-12 col-md-12 my-5 '>
            <div className='container my-4 registration d-flex justify-content-center'>
                <div className="col-lg-5 col-md-5 m-auto">
                <h3 className='text-left'>Welcome to Classroom Clone</h3>
                    <Form.Group className="my-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value= {email} onChange={(e)=> {
                           setEmail(e.target.value);
                        }}/>
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password"  value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                    </Form.Group>
                    <Button variant="success" type='submit' onClick={handleLogin}>
                        Login
                    </Button>
                    <Button variant="danger" type='submit' onClick={logout}>
                        Logout
                    </Button>
                    <NavLink className='mx-3 text-decoration-none' to= "/register" >User Register Here</NavLink>
                </div>
                <div className='col-lg-5 col-md-5'><img className='img-fluid' src={LoginImage} alt='Not available'/></div>
            </div>
            </div>
        </>
    );
}

export default Login;