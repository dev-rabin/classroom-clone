import { Alert, Button, Container, FloatingLabel, Form } from "react-bootstrap";
import "../App.css";
import { useState } from "react";
import { useAuth } from "../../store/auth";

function CreateClassPage() {
  const { user } = useAuth();
  console.log("create class user : ", user);
  const [classCreateForm, setClassCreateForm] = useState({
    className: "",
    teacherId: user.userId,
    classDesc: "",
  });

  const [error,setError] = useState("");
  const [successMesage,setSuccessMessage] = useState("");

  const createClass = async () => {
    if (!classCreateForm.className.trim()  || !classCreateForm.classDesc.trim()) {
      setError("Please fill all class details");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/createClass", {
        method: "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(classCreateForm),
      });

      if (response.ok) {
        const responseData = await response.json()
        console.log("Class created successful",responseData.id);
        setSuccessMessage("Class has been created");
        setClassCreateForm({
          teacherId: "",
          className: "",
          classDesc: "",
        });
      }
    } catch (error) {
      console.error("Error during class create");
    }
  };

  const handleClassInputChange = (e) => {
    setClassCreateForm({...classCreateForm,[e.target.name]: e.target.value,});
  };

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
              name="className"
              value={classCreateForm.className}
              onChange={handleClassInputChange}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Class Description">
            <Form.Control
              className="form-field my-3"
              type="text"
              placeholder="Description"
              name="classDesc"
              value={classCreateForm.classDesc}
              onChange={handleClassInputChange}
            />
          </FloatingLabel>
          <div className="text-center my-3">
            {error && <Alert variant="danger">{error}</Alert>}
            {successMesage && <Alert variant="success">{successMesage}</Alert>}
            <Button variant="success" onClick={() => createClass()}>
              Create Class
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
export default CreateClassPage;
