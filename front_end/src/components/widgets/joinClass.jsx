import "react-bootstrap";
import "./widgets.css";
import { Button } from "react-bootstrap";
import { Input } from "reactstrap";
function JoinClass() {
    return (
        <>
            <div className="container rounded col-5 my-3 border">
            <p className="m-2">Currently, you are signed in as :</p>
           <div  className="d-flex justify-content-between m-2">
          <div>
          <strong><div>Robin Mandhotia</div></strong>
            <p>robinmandhotia@gmail.com</p>
          </div>
          <Button variant="none" className="border m-2 account-btn">Switch Account</Button>
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