import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../store/auth';

function ClassPeople() {
  const {classId} = useParams();
  const {studentsList,getAllStudentsByClassId} = useAuth();
  console.log("Students list from useAuth : ", studentsList);

  useEffect(()=>{
    getAllStudentsByClassId(classId);
  },[classId])
  
  return (
    <div>
      <Container className='my-5'>
        <div className='fs-2'>Students</div>
        <hr />
        <div>{studentsList && studentsList.map((student, index)=>(
        <div key={index} className='d-flex p-2'>
        <div className='mx-2'><FontAwesomeIcon icon={faUser}/></div>
          <div >
            <div><strong>{student.name}</strong></div>
          </div>
        </div>
        ))}</div>
      </Container>
    </div>
  )
}

export default ClassPeople
