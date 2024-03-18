import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Class.css";

function ClassDetails() {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getClassByClassId = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/class/${classId}`
        );
        if (response.ok) {
          const classData = await response.json();
          console.log("Class data retrieved successfully:", classData);
          setClassDetails(classData.data);
        } else {
          console.error(
            "Error fetching data by class ID:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data by class ID:", error);
      }
    };

    getClassByClassId();
  }, [classId]);

  return (
    <>
      <div className="container my-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between align-items-center col-4 class-navbar">
            <div>Stream</div>
            <div onClick={()=> navigate("/class/:classId/classwork")}>Classwork</div>
            <div>People</div>
            <div>Grades</div>
          </div>
          <div>Icons</div>
        </div>
      </div>
      <Container className="bg-secondary rounded text-white p-5 my-5">
        {classDetails.length === 0 ? (
          <div>No data available for this class ID.</div>
        ) : (
          <div>
            {classDetails.map((classData, index) => (
              <>
                <div key={index}>{classData.className}</div>
                <div>{classData.classDesc}</div>
              </>
            ))}
          </div>
        )}
      </Container>
      <Card className="my-5 p-4 container mx-auto hover">
        <div className="d-flex align-items-center">
          <div className="bg-success p-3 rounded-circle">
            <FontAwesomeIcon icon={faFile} fontSize={"18px"} color="white" />
          </div>
          <div className="p-2">
            <Card.Subtitle>
              Robin Posted a new Assignment : Flutter Development Widgets
            </Card.Subtitle>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ClassDetails;
