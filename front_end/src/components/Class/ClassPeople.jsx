import React from 'react'
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ClassPeople() {
  
  return (
    <div>
      <Container>
        <div className='fs-2'>Teachers</div>
        <hr />
        <div className='d-flex p-2'>
        <div className='mx-2'><FontAwesomeIcon icon={faUser}/></div>
        <p>Teacher names</p>
        </div>
      </Container>
    </div>
  )
}

export default ClassPeople
