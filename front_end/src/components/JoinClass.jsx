import "react-bootstrap";
import "../widgets/widgets.css";
import { Button } from "react-bootstrap";
import { Input } from "reactstrap";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";

function JoinClass() {
    const {user} = useAuth();

    return (
        <>
            <div className="container rounded col-5 my-3 border">
            <p className="m-2">Currently, you are signed in as :</p>
           <div  className="d-flex justify-content-between m-2">
          <div>
          <strong><div>{user ? user.name : "Your Name"}</div></strong>
            <p>{user ? user.email : "Your Email"}</p>
          </div>
          <NavLink to="/logout"><Button variant="none" className="border m-2 account-btn">Switch Account</Button></NavLink>
           </div>
            </div>
            <div className="container rounded col-5 my-3 border">
           <h3 className="m-2">Class Code</h3>
           <div className="m-2">Ask your teacher for the class code, then enter it here.</div>
            <Input className="p-3 my-3" type="text" placeholder="Enter class code"></Input>
            <div className="mt-5"></div>
            </div>
        </>
    )
}

export default JoinClass;