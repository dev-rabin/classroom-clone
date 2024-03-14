import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "../images/sign-up.png";
import { Container } from "react-bootstrap";

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
      const teachingClassesData = await response.json();
      if (response.ok) {
        console.log(
          "Get teaching class data teachingClasses : ",
          teachingClassesData.data
        );
        setTeachingClass(teachingClassesData.data);
      }
    } catch (error) {
      console.error("Error fetching teaching classes:", error);
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
          {teachingClass.length === 0 ? (
            <div>No classes found</div>
          ) : (
            teachingClass.map((classObj, index) => (
              <Card key={index} style={{ width: "20rem", margin: "0.5rem" }}>
                <img
                  src={Image}
                  alt="Not-available"
                  style={{
                    height: "10rem",
                    objectFit: "scale-down",
                    width: "auto"
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
                      Go{" "}
                      <span>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                      </span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>
    </>
  );
}

export default TeachingClassesPage;
