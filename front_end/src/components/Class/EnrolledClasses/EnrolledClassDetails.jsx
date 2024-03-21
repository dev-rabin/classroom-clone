import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../store/auth";

function EnrolledClassDetails() {
  const { createAnnouncement, getAnnouncements, getClassByClassId, classDetails } = useAuth();
  const { classId } = useParams();
  const [announcementCreate, setAnnouncementCreate] = useState({
    class_id: classId,
    announcement: "",
  });
  const navigate = useNavigate();
  const location = useLocation()

  const handleCreateAnnouncement = async () => {
    try {
      if (announcementCreate.announcement.trim() !== "") {
        await createAnnouncement(announcementCreate); 
        console.log("handleCreateAnnouncement clicked ");
        setAnnouncementCreate({
          class_id: classId,
          announcement: "",
        });
      } else {
        console.log("Announcement content is empty");
        alert("Announcement content is empty");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };
  
  const handleInputAnnouncement = (e) => {
    const { name, value } = e.target;
    setAnnouncementCreate((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    getClassByClassId(classId);
    getAnnouncements(classId);
  }, [classId]);

  const isLinkActive = (path) => {
    return location.pathname === path ? "text-decoration-underline" : "";
  };

  return (
    <div>
      <Container className="mb-5">
      <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center col-3 class-navbar">
        <div
          onClick={() => navigate(`/enrolledclass/${classId}`)}
          className={isLinkActive(`/enrolledclass/${classId}`)}
        >
          Stream
        </div>
        <div
          onClick={() => navigate("classwork")}
          className={isLinkActive("classwork")}
        >
          Classwork
        </div>
        <div
          onClick={() => navigate("people")}
          className={isLinkActive("people")}
        >
          People
        </div>
      </div>
    </div>
        <Container className="rounded text-white p-4 my-5 shadow" style={{background: "#298943"}}>
          <div className="fw-bold">
            {classDetails && classDetails.map((classObj, index) => (
              <div key={index}>
                <p className="fs-2">{classObj.className}</p>
                <p className="fs-3">{classObj.classDesc}</p>
              </div>
            ))}
          </div>
        </Container>
        <Outlet />
        <div className="fs-3 mx-2">Announcements</div>
        <Card className="my-2 p-3 container mx-auto hover shadow">
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
                onClick={handleCreateAnnouncement}
              >
                <FontAwesomeIcon icon={faMessage} fontSize="20px" />
              </button>
            </div>
          </div>
        </Card>
        <Card className="my-2 p-4 container mx-auto hover shadow">
          <div className="d-flex align-items-center">
            <div className="bg-success p-2 rounded-circle">
              <FontAwesomeIcon icon={faFile} fontSize={"18px"} color="white" />
            </div>
            <div className="p-2">
              <Card.Subtitle>
                Posted an announcement: New Announcement
              </Card.Subtitle>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default EnrolledClassDetails;
