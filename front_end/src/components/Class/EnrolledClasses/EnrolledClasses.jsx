import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Image from "../../images/sign-up.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import {useNavigate, useParams } from "react-router-dom";

function EnrolledClassesPage() {
  const token = localStorage.getItem("token");
  const [myClasses, setMyClasses] = useState([]);
  const navigate = useNavigate();

  const myJoinedClasses = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/classenrolledByStudent",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        } 
      );
      const myClassesData = await response.json();
      if (response.ok) {
        console.log("Get class data in myJoinedClasses : ", myClassesData.data);
        setMyClasses(myClassesData.data || []);
      }
    } catch (error) {
      console.error("Error fetching joined classes:", error);
    }
  };

  useEffect(() => {
    myJoinedClasses();
  }, []);


  const convertDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US',{
      timeZone : "Asia/Kolkata"
    });
  }
  return (
    <>
      <Container className="my-2">
        <h2 className="text-decoration-underline">Enrolled</h2>
        <div>
          {myClasses.length === 0 ? (
            <div>No classes found</div>
          ) : (
            <div className="d-flex justify-content-start">
              {myClasses.map((classObj, index) => (
                <Card key={index} style={{ width: "20rem", margin: "0.5rem", }} className="shadow" 
                onClick={()=> navigate(`/enrolledclass/${classObj.classId}`) }>
                  <img
                    src={Image}
                    alt="Not-available"
                    style={{ height: "10rem", objectFit: "scale-down" ,width:"auto",}}
                  />
                  <Card.Body>
                    <Card.Title>{classObj.className}</Card.Title>
                    <Card.Text>{classObj.classDesc}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Card.Subtitle className="my-auto">
                        Teacher : {classObj.name}
                      </Card.Subtitle>
                      <Button variant="success" className="p-1 my-2">
                          <FontAwesomeIcon icon={faArrowCircleRight} />
                      </Button>
                    </div>
                      <Card.Text>Created at : {convertDateTime(classObj.createdAt)}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default EnrolledClassesPage;
