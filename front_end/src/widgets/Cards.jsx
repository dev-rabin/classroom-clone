import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from "./sign-up.png";
import { useAuth } from '../store/auth';

function Cards() {
  const { myClasses } = useAuth();
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    if (myClasses && myClasses.success && Array.isArray(myClasses.data)) {
      setClassesData(myClasses.data);
    }
  }, [myClasses]);

  if (classesData.length === 0) {
    return <div>No classes found</div>;
  } else {
    return (
      <div>
        {classesData.map((classObj, index) => (
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

export default Cards;
