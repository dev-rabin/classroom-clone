import { faNewspaper, faPlus, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function AssignmentDetails() {
    const location = useLocation();
    const { assignments } = location.state || {};

    const convertTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleDateString("en-US",{
            timeZone : "Asia/Kolkata"
        })
    }

    return (
        <div>
            <Container className='d-flex gap-1 my-5'>
                <Container className='p-5'>
                    {assignments.map((assignment, index) => (
                        <div key={index} className='text-dark'>
                            <div className='d-flex align-items-center'>
                            <div>
                            <FontAwesomeIcon icon={faNewspaper} fontSize="18px" className='text-white p-3 mt-1 rounded-circle bg-primary'/>
                            </div>
                            <div className='fs-2 fw-bold mx-2'>{assignment.title}</div>
                            </div>
                            <Container style={{marginLeft:"3rem"}}>
                            <div className='d-flex'>
                            <p>{assignment.name}</p>
                            <p className='mx-2'>{convertTime(assignment.createdAt)}</p>
                            </div>
                            <p>Points : {assignment.points}</p>
                            <hr />
                            <p>Due date : {convertTime(assignment.dueDate)}</p>
                            <p>Class : {assignment.className}</p>
                            <p>
                                File :
                                <a href={`http://localhost:4000/api/${assignment.fileAttach}`} target='_blank' rel='noopener noreferrer'>
                                    <FontAwesomeIcon icon={faFileDownload} />
                                    Download File
                                </a>
                            </p>
                            </Container>
                        </div>
                    ))}
                </Container>
                <Container className='border p-5 col-3 shadow'>
                    <p className='fs-3'>Your Work</p>
                    <Button className='px-5 d-flex align-items-center border text-primary rounded my-2 col-12' variant='none'>
                        <FontAwesomeIcon icon={faPlus} />
                        <div className='mx-2'>Add or create</div>
                    </Button>
                    <Button className='px-5 border rounded col-12'>
                        Mark as done
                    </Button>
                </Container>
            </Container>
        </div>
    );
}

export default AssignmentDetails;
