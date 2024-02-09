import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from "../images/sign-up.png";
import { useAuth } from '../store/auth';

function MyClassesPage() {
  const { myClasses } = useAuth();

  if (myClasses.length === 0) {
    return <div>No classes found</div>;
  } else {
    return (
      <div>
        {myClasses.map((classObj, index) => (
          <Card key={index}>
            <Card.Img variant="top" src={Image} />
            <Card.Body>
              <Card.Title> {classObj.className}</Card.Title>
              <Card.Text>
               
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default MyClassesPage;
