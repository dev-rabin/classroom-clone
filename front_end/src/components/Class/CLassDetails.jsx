import { faFile, faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {Card, Container } from "react-bootstrap";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./Class.css";
import { useAuth } from "../../store/auth";

function ClassDetails() {
  const { createAnnouncement } = useAuth();
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState([]);
  const [announcementCreate, setAnnouncementCreate] = useState({
    class_id: classId,
    announcement: "",
  });

  const [announcementData, setAnnouncementData] = useState([]);

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
        console.error("Error fetching data by class ID:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data by class ID:", error);
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      if (announcementCreate.announcement.trim() !== '') {
        await createAnnouncement(announcementCreate); 
        console.log("handleCreateAnnouncement clicked ");
        setAnnouncementCreate({
          class_id: classId,
          announcement: "",
        });
      } else {
        console.log("Announcement content is empty");
        alert("Announcement content is empty")
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };
  

  const handleInputAnnouncement = (e) => {
    const { name, value } = e.target;
    setAnnouncementCreate((prevData) => ({ ...prevData, [name]: value }));
  };

  const getAnnouncements = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/${classId}/announcements`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setAnnouncementData(responseData.data);
      }
    } catch (error) {
      console.error("getAnnouncements unsuccessfully : ", error);
    }
  };

  useEffect(() => {
    getClassByClassId();
    getAnnouncements();
  }, [classId]);


  return (
    <>
      <Container className="p-1">
        <div className="container my-4 navbar">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center col-4 class-navbar">
              <div onClick={() => navigate(`/teachingclass/${classId}`)}>
                Stream
              </div>
              <div onClick={() => navigate(`classwork`)}>Classwork</div>
              <div onClick={() => navigate(`people`)}>People</div>
              <div onClick={() => navigate(`grades`)}>Grades</div>
            </div>
          </div>
        </div>
        <Container className="bg-secondary rounded text-white p-5 my-5">
          {classDetails.map((classObj, index) => (
            <div key={index}>
              <p>{classObj.className}</p>
              <p>{classObj.classDesc}</p>
            </div>
          ))}
        </Container>
        <Outlet />
        <div className="fs-3">Annoucements</div>
        <Card className="my-2 p-3 container mx-auto hover">
          <div className="d-flex justify-content-around align-items-center">
            <div className="col-10">
              <input
                className="col-12 p-2"
                type="text"
                style={{ outline: "none", border: "none" }}
                placeholder="Announce something..."
                name="announcement"
                value={announcementCreate.announcement}
                onChange={handleInputAnnouncement}
              />
            </div>
            <div className="col-1">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleCreateAnnouncement();
                  console.log("Clicked");
                }}
              >
                <FontAwesomeIcon icon={faMessage} fontSize="20px" />
              </button>
            </div>
          </div>
        </Card>
        {announcementData &&
          announcementData.map((announcement, index) => (
            <Card key={index} className="my-2 p-4 container mx-auto hover">
              <div className="d-flex align-items-center">
                <div className="bg-success p-2 rounded-circle">
                  <FontAwesomeIcon
                    icon={faFile}
                    fontSize={"18px"}
                    color="white"
                  />
                </div>
                <div className="p-2">
                  <Card.Subtitle>
                    Posted a announcement : {announcement.announcement}
                  </Card.Subtitle>
                </div>
              </div>
            </Card>
          ))}
      </Container>
    </>
  );
}

export default ClassDetails;
