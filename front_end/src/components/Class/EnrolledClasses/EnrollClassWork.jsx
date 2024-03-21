import React, { useEffect} from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import "../Class.css"
import { useAuth } from "../../../store/auth";


function EnrollClassWork() {
  const { classId } = useParams();
  const navigate = useNavigate();
 const {fetchAssignments, assignments} = useAuth();

  useEffect(() => {
    fetchAssignments(classId);
  }, [classId]);

  // const attachmentFileOpen = (fileAttach) => {
  //   window.open(`http://localhost:4000/api/${fileAttach}`,'_blank')
  // }

  const navigateWithAssignmentDetails = (assignmentId)=>{
    navigate(`/enrollclass/assignmentdetails/${assignmentId}`,{
      state : {assignments}
    })
  }

  const convertDateTime =(dateTimeString)=>{
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US',{
      timezone : "Asia/Kolkata"
    })
  }

  return (
    <div>
      <Container className="border rounded p-4 my-3">
        <div className="fs-2">Topic Names</div>
        <hr />
        {assignments.map((assignment, index) => (
          <div key={index}>
            <Card className="my-3 p-3 container mx-auto shadow classwork-card" 
            onClick={()=>navigateWithAssignmentDetails(assignment.assignmentId)}>
              <Row>
                <Col>
                  <div className="d-flex align-items-center">
                    <div className="bg-success p-3 rounded-circle">
                      <FontAwesomeIcon icon={faFile} fontSize={"18px"} color="white" />
                    </div>
                    <div className="p-2">
                      <Card.Subtitle 
                      // onClick={()=>attachmentFileOpen(assignment.fileAttach)}
                      
                       className="text-decoration-underline">
                        Posted a new Assignment : {assignment.title}
                      </Card.Subtitle>
                      <Card.Text>Due Date : {convertDateTime(assignment.dueDate)}</Card.Text>
                    </div>
                  </div>
                </Col>
                <Col xs="auto">
                  <div className="d-flex justify-content-between align-items-center">
                      <Card.Footer>Points : {assignment.points}</Card.Footer>
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default EnrollClassWork;
