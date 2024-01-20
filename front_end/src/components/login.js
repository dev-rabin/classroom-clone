import {useState} from 'react';
import NavbarPage from './navbar';
import Form from 'react-bootstrap/Form';
import LoginImage from '../images/sign-up.png';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import UserRegistration from './user_registration';

const Login = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loggedIn, setLoggedIn] = useState(false);

      const  handleLogin =async () => {
        try {
            const result = await fetch('http://localhost:4000/api/login', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({email, password}),
            }).then(alert('You are logged in'));
            setLoggedIn(true);
            const data = await result.json()
            console.log(data);
        } catch (error) {
            console.error('Error During Login!',error.message);
        }
        }
        if(loggedIn){
            return <Redirect to ='/'/>
        }
    return (
        <>
            <NavbarPage />
            <div className='container my-4 registration d-flex justify-content-center'>
                <div className="col-lg-5 col-md-5 m-auto">
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
                        Register
                    </Button>
                    <Link to= {UserRegistration}>User Register Here</Link>
                </div>
                <div className='col-lg-5 col-md-5'><img className='img-fluid' src={LoginImage} alt='Not available'/></div>
            </div>
        </>
    );
}

export default Login;