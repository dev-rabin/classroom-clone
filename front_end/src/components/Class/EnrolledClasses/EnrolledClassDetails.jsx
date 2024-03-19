import React, { useState } from "react";
import {Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../store/auth";

function EnrolledClassDetails() {
  const location = useLocation();
  const {createAnnouncement} = useAuth();
  const { classId } = useParams();
  const classData = location.state?.classData || {};
  const [announcementCreate, setAnnouncementCreate] = useState({
    class_id: classId,
    announcement: "",
  });

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

  console.log("Enrolled class data : ", classData);
  return (
    <div>
      <Container>
        <div className="container my-4 navbar">
          <div className="d-flex justify-content-between align-items-center col-3 class-navbar">
            <div>Stream</div>
            <div>Classwork</div>
            <div>People</div>
          </div>
        </div>
        <Container className="bg-secondary rounded text-white p-5 my-5">
          <div>
            <div>
              <p>{classData.className}</p>
              <p>{classData.classDesc}</p>
            </div>
          </div>
        </Container>
        <div>Annoucements</div>
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
            <div>
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
        <Card className="my-2 p-4 container mx-auto hover">
          <div className="d-flex align-items-center">
            <div className="bg-success p-2 rounded-circle">
              <FontAwesomeIcon icon={faFile} fontSize={"18px"} color="white" />
            </div>
            <div className="p-2">
              <Card.Subtitle>
                Posted a announcement : New Announcement
              </Card.Subtitle>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default EnrolledClassDetails;
