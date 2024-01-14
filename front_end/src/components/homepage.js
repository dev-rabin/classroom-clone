import NavbarPage from "./navbar";
import Form from 'react-bootstrap/Form';

function Homepage() {
    return (
        <>
            <NavbarPage />
            <div className="container my-3">
            <Form >
                <Form.Group className="mb-3 col-lg-6 col-md-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="Teacher or Student" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6 col-md-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6 col-md-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6 col-md-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                </Form.Group>

                <Form.Group className="mb-3 col-lg-6 col-md-6" controlId="exampleForm.ControlInput1">
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter your roll number" />
                </Form.Group>
            </Form>
            </div>
        </>
    )
}

export default Homepage;