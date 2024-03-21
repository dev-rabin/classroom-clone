import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [studentsList,setStudentsList] = useState([]);
  const [announcementData, setAnnouncementData] = useState([]);
  const [classDetails, setClassDetails] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const isLoggedIn = !!token;
  console.log("User login", isLoggedIn);

  const storeToken = (serverToken) => {
    console.log("Server token:", serverToken);
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const logOutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };


  //User Data Getting API Calling
  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData.data);
        console.log(responseData.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  };

  //Anouncement API Calling
  const createAnnouncement = async (announcement) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/createannouncement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(announcement),
        }
      );
      if (response.ok) {
        console.log("createAnnouncement successfully ! ");
        return alert("Announcement created");
      }
    } catch (error) {
      console.error("createAnnouncement error : ", error);
      return alert("Error creating announcement");
    }
  };

  // GetALlStudents by CLass ID API Calling
  const getAllStudentsByClassId = async(classId)=>{
    try {
      const response = await fetch(`http://localhost:4000/api/${classId}/enrolledstudents`,{
        method : "GET"
      });
      if (response.ok) {
        const studentsList = await response.json();
        setStudentsList(studentsList.data);
        console.log("Students list by classId : ", studentsList);
      }
    } catch (error) {
      console.error("Error getting student list , ",error);
    }
  }

  // CLass Announcemnt API Callling
  const getAnnouncements = async (classId) => {
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
        console.log("getAnnouncements data : ", responseData.data);
      }
    } catch (error) {
      console.error("getAnnouncements unsuccessfully : ", error);
    }
  };

  //Get Class By CLassId API Calling
  const getClassByClassId = async (classId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/class/${classId}`
      );
      if (response.ok) {
        const classData = await response.json();
        setClassDetails(classData.data);
      } else {
        console.error("Error fetching data by class ID:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data by class ID:", error);
    }
  };

  // Fetch assignments API Calling
  const fetchAssignments = async (classId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/assignments/${classId}`);
      if (response.ok) {
        const assignments = await response.json();
        console.log("fetchAssignments data : ",assignments);
        setAssignments(assignments.data);
      } else {
        console.error("Failed to fetch assignments");
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
      getAllStudentsByClassId();
      getAnnouncements();
      getClassByClassId();
      fetchAssignments();
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ storeToken, logOutUser, isLoggedIn, user, createAnnouncement,studentsList,getAllStudentsByClassId,getAnnouncements,announcementData,getClassByClassId ,classDetails,fetchAssignments,assignments}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
