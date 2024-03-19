import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "../images/teacher.png";
import { Container } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function TeachingClassesPage() {
  const [teachingClass, setTeachingClass] = useState([]);
  const token = localStorage.getItem("token");
  

  const getTeachingClasses = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/teachingClasses",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.message}`);
      }
  
      const teachingClassesData = await response.json();
      console.log("Response from server:", teachingClassesData);
  
      if (teachingClassesData && teachingClassesData.data) {
        console.log("Get teaching class data teachingClasses: ", teachingClassesData.data);
        setTeachingClass(teachingClassesData.data);
      } else {
        console.log("Teaching class data not found in response:", teachingClassesData);
      }
    } catch (error) {
      console.log("Error fetching teaching classes:", error);
    }
  };

  useEffect(() => {
    getTeachingClasses();
  }, []);

 
  return (
    <>
      <Container className='my-2'>
        <h2 className="text-decoration-underline">Teaching</h2>
        <div className="d-flex flex-wrap">
          {teachingClass.length === 0 ? <div>No Teaching Classes for you!</div> : (
            <div className="d-flex justify-content-center">
            {teachingClass && teachingClass.map((classObj, index) => (
             <Card key={index} style={{ width: "20rem", margin: "0.5rem"}} className="shadow"
              >
             <Link to={`teachingclass/${classObj.classId}`}>
                <img
                  src={Image}
                  alt="Not-available"
                  style={{
                    height: "10rem",
                    objectFit: "scale-down",
                    width: "auto",
                  }}
                />
                <Card.Body>
                  <Card.Title>{classObj.className}</Card.Title>
                  <Card.Text>{classObj.classDesc}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Card.Subtitle className="my-auto">
                      Teacher id: {classObj.teacherId}
                    </Card.Subtitle>
                    <Button variant="success" className="p-1 my-2">
                      <span>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                      </span>
                    </Button>
                  </div>
                </Card.Body>
             </Link>
              </Card>
            ))
          }
            </div>
          )}
           
        </div>
      </Container>
    </>
  );
}

export default TeachingClassesPage;
