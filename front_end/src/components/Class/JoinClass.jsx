import "react-bootstrap";
// import "../widgets/widgets.css";
import { Button } from "react-bootstrap";
import { Input } from "reactstrap";
import { useAuth } from "../../store/auth";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function JoinClass() {
  const { user } = useAuth();
  const [joinClass, setJoinClass] = useState({
    classId: "",
    studentId: user ? user.userId : "",
  });

  // Update studentId when user changes
  useEffect(() => {
    if (user) {
      setJoinClass((prevState) => ({
        ...prevState,
        studentId: user.userId,
      }));
    }
  }, [user]);

  const joiningClass = async () => {
    const response = await fetch("http://localhost:4000/api/enrollmentClass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinClass),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log("You are enrolled with class", responseData.message);
      alert(responseData.message);
      setJoinClass({
        classId: "",
        studentId: "",
      });
      return;
    } else {
      alert(response.message);
      console.error("You are not enrolled with class");
      return;
    }
  };
  const handleClassCode = (e) => {
    const { name, value } = e.target;
    setJoinClass((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container rounded col-5 my-3 border p-3">
        <p className="m-2">Currently, you are signed in as :</p>
        <div className="d-flex justify-content-between m-2">
          <div>
            <strong>
              <div>{user ? user.name : "Your Name"}</div>
            </strong>
            <p>{user ? user.email : "Your Email"}</p>
          </div>
          <NavLink to="/logout">
            <Button variant="none" className="border m-2 account-btn">
              Switch Account
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="container rounded col-5 my-3 border p-3">
        <h3 className="m-2">Class Code</h3>
        <div className="m-2">
          Ask your teacher for the class code, then enter it here.
        </div>
        <Input
          className="p-3 my-3"
          type="text"
          placeholder="Enter class code"
          name="classId"
          value={joinClass.classId}
          onChange={handleClassCode}
        ></Input>
        <div>
          <Button variant="success" onClick={() => joiningClass()}>
            Join Class
          </Button>
        </div>
      </div>
    </>
  );
}

export default JoinClass;
