import { useState } from "react";
import { Button, Container, Dropdown, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CreateAssignmentsPage() {
    const {classId} = useParams();
    const navigate = useNavigate();
    console.log("CreateAssignmentsPage classId : ", classId);
    const [assignment, setAssignment] = useState({
    classId: classId,
    title: "",
    description: "",
    dueDate: "",
    fileAttach: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Event creation fileAttach : ", file);
    setAssignment((prevData) => ({ ...prevData, fileAttach: file }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Event creation Name:", name);
    console.log("Event creation Value:", value);
    setAssignment((prevData) => ({ ...prevData, [name]: value }));
  };

  const createAssignment = async (e) => {
    try {
      const assignmentFormDataWithFile = new FormData();
      assignmentFormDataWithFile.append("classId", assignment.classId);
      assignmentFormDataWithFile.append("title", assignment.title);
      assignmentFormDataWithFile.append("description", assignment.description);
      assignmentFormDataWithFile.append("fileAttach", assignment.fileAttach);
      assignmentFormDataWithFile.append("dueDate", assignment.dueDate);

      console.log("assignmentFormDataWithFile : ", assignmentFormDataWithFile);
      const response = await fetch(
        "http://localhost:4000/api/createassignment",
        {
          method: "POST",
          body: assignmentFormDataWithFile,
        }
      );
      if (response.ok) {
        const assignmentData = await response.json();
        alert("Assignment created successfully!")
        setAssignment({
          classId: "",
          title: "",
          description: "",
          dueDate: "",
          fileAttach: null,
        });
        navigate("/:classId/classwork");
        console.log("Assignment has been created : ", assignmentData);
      }
     
    } catch (error) {
      error("Error creating error : ", error);
    }
  };
  return (
    <>
      <div className="d-flex container my-3 gap-1">
        <Container className="border rounded p-4 col-8">
          <div className="fs-2 mb-3">Assignment</div>
          <Form.Floating className="mb-3">
            <Form.Control
              name="title"
              value={assignment.title}
              onChange={handleInputChange}
              id="floatingInputCustom"
              type="text"
              placeholder="title"
              style={{
                borderBottom: "1px solid #ced4da",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
            />
            <label htmlFor="floatingInputCustom">Title</label>
          </Form.Floating>
          <div className="md-form mb-3 col-12">
            <label className="p-2">Description</label>
            <textarea
              name="description"
              value={assignment.description}
              onChange={handleInputChange}
              id="form7"
              className="md-textarea form-control"
              rows="4"
              style={{
                borderBottom: "1px solid #ced4da",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
            ></textarea>
          </div>
          <div className="file-upload-wrapper mb-3">
            <input
              type="file"
              id="input-file-now"
              className="file-upload"
              name="fileAttach"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Button
              className="p-2 fw-bold"
              variant="success"
              onClick={() => {
                createAssignment();
              }}
            >
              Create
            </Button>
          </div>
        </Container>
        <Container className="border rounded p-3">
          <div>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                All Students
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Robin Mandhotia</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Nishant Kumar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mb-3">
            <label>Points : </label>
            <div>
              <input type="number" name="points" />
            </div>
          </div>
          <div>
            <label>Due Date : </label>
            <div>
              <input
                type="date"
                name="dueDate"
                value={assignment.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default CreateAssignmentsPage;
