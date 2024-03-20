import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "../Class.css";
import { useAuth } from "../../../store/auth";

function ClassDetails() {
  const { createAnnouncement, getAnnouncements, announcementData, getClassByClassId, classDetails } = useAuth();
  const { classId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [announcementCreate, setAnnouncementCreate] = useState({
    class_id: classId,
    announcement: "",
  });

  const [creatingAnnouncement, setCreatingAnnouncement] = useState(false);

  const handleCreateAnnouncement = async () => {
    try {
      if (announcementCreate.announcement.trim() !== "") {
        setCreatingAnnouncement(true); // Set creatingAnnouncement to true
        await createAnnouncement(announcementCreate);
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
    getClassByClassId();
    getAnnouncements(classId);
    getClassByClassId(classId);
  }, [classId]);

  useEffect(() => {
    if (announcementData && creatingAnnouncement) {
      // Reset creatingAnnouncement and refresh page only once
      setCreatingAnnouncement(false);
      window.location.reload();
    }
  }, [announcementData, creatingAnnouncement]);

  const isLinkActive = (path) => {
    return location.pathname === path ? "text-decoration-underline" : "";
  }

  return (
    <>
      <Container className="p-1">
        <div className="container my-4 navbar">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between align-items-center col-4 class-navbar">
              <div onClick={() => navigate(`/teachingclass/${classId}`)} className={isLinkActive(`/teachingclass/${classId}`)}>
                Stream
              </div>
              <div onClick={() => navigate(`classwork`)} className={`classwork`}>Classwork</div>
              <div onClick={() => navigate(`people`)} className="people">People</div>
              <div onClick={() => navigate(`grades`)} className="grades">Grades</div>
            </div>
          </div>
        </div>
        <Container className="rounded text-white p-5 my-5 shadow" style={{ background: "rgb(255, 164, 71)" }}>
          {classDetails.map((classObj, index) => (
            <div key={index} className="fw-bold">
              <p className="fs-1">{classObj.className}</p>
              <p className="fs-2">{classObj.classDesc}</p>
            </div>
          ))}
        </Container>
        <Outlet />
        <div className="fs-3">Announcements</div>
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
                onClick={handleCreateAnnouncement}
              >
                <FontAwesomeIcon icon={faMessage} fontSize="20px" />
              </button>
            </div>
          </div>
        </Card>
        {announcementData &&
          announcementData.map((announcement, index) => (
            <Card key={index} className="my-2 p-4 container mx-auto hover shadow">
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
                    Posted an announcement: {announcement.announcement}
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
