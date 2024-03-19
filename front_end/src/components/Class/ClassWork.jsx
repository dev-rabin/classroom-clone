import React, { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus, faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

function ClassWork() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments(classId);
  }, [classId]);

  const fetchAssignments = async (classId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/assignments/${classId}`);
      if (response.ok) {
        const assignments = await response.json();
        setAssignments(assignments.data);
      } else {
        console.error("Failed to fetch assignments");
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  return (
    <div>
      <Container className="border rounded p-4 my-3">
        <Button variant="warning mb-3" onClick={() => navigate(`/createassignment/${classId}`)}>
          <span className="p-2">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          Create
        </Button>
        <div className="fs-2">Topic Names</div>
        <hr />
        {assignments.map((assignment, index) => (
          <div key={index}>
            <Card className="my-3 p-3 container mx-auto hover">
              <Row>
                <Col>
                  <div className="d-flex align-items-center">
                    <div className="bg-success p-3 rounded-circle">
                      <FontAwesomeIcon icon={faFile} fontSize={"18px"} color="white" />
                    </div>
                    <div className="p-2">
                      <Card.Subtitle>
                        Posted a new Assignment : {assignment.title}
                      </Card.Subtitle>
                      <Card.Text>Due Date : {assignment.dueDate}</Card.Text>
                    </div>
                  </div>
                </Col>
                <Col xs="auto">
                  <div className="text-end">
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

export default ClassWork;
