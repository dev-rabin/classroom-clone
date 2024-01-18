// import {useState} from 'react';
import NavbarPage from './navbar';

const Login = () =>{
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
    <NavbarPage/>
    <Form.Group className="my-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput1">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="text" placeholder="Teacher or Student" name='user_type' value={formData.user_type} onChange={hadleInputChange} />
                    </Form.Group>

                    <Form.Group className="mb-3 col-lg-12 col-md-12" controlId="exampleForm.ControlInput2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" name='name' value={formData.name} onChange={hadleInputChange} />
                    </Form.Group>
    </>
);
}

export default Login;