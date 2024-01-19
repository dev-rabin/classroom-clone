// import {useState} from 'react';
import NavbarPage from './navbar';
import Form from 'react-bootstrap/Form';
import LoginImage from '../images/sign-up.png';
import Button from 'react-bootstrap/Button';
const Login = () => {
    //     const [email, setUsername] = useState('');
    //     const [password, setPassword] = useState('');

    //   const  handleLogin =async () => {
    //     try {
    //         const result = await fetch('')
    //     } catch (error) {

    //     }
    //     }
    return (
        <>
            <NavbarPage />
            <div className='container my-4 registration d-flex justify-content-center'>
                <div className="col-lg-5 col-md-5 m-auto">
                    <Form.Group className="my-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" name='user_type' value='' />
                    </Form.Group>
                    <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" name='name' value='' />
                    </Form.Group>
                    <Button variant="success" type='submit'>
                        Register
                    </Button>
                </div>
                <div className='col-lg-5 col-md-5'><img className='img-fluid' src={LoginImage} alt='Not available'/></div>
                
            </div>
        </>
    );
}

export default Login;