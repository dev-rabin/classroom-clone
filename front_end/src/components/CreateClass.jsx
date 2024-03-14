import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import "./App.css";
function CreateClassPage() {
  
  return (
    <>
      <Container className="border p-3 my-2 col-10">
        <h1 className="text-center my-3">Create Class</h1>
        <div className="mx-auto col-6">
          <FloatingLabel
            controlId="floatingInput"
            label="Class Name"
            className="mb-3"
          >
            <Form.Control
              className="form-field my-3"
              type="test"
              placeholder="Name"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Class Description">
            <Form.Control
              className="form-field my-3"
              type="text"
              placeholder="Description"
            />
          </FloatingLabel>
          <div className="text-center my-3">
            <Button variant="success">Create Class</Button>
          </div>
        </div>
      </Container>
    </>
  );
}
export default CreateClassPage;
