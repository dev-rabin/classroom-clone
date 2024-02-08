import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Import NavLink
import "./widgets.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faBook,faDatabase, faFile } from '@fortawesome/free-solid-svg-icons';



function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`drawer ${isOpen ? 'open' : ''} bg-body-tertiary`}>
        <div className="drawer-menu">
        <Button variant='light' className="close-btn" onClick={toggleDrawer}>
            &times;
          </Button>
        <NavLink to="/"><div><FontAwesomeIcon className='mx-2' icon={faHome}/>Home</div></NavLink>
        <NavLink to="/classes"><div><FontAwesomeIcon className='mx-2' icon={faBook}/>Classes</div></NavLink>
        <NavLink to="/assignments"><div><FontAwesomeIcon className='mx-2' icon={faFile}/>Assignments</div></NavLink>
        <NavLink to="/submissions"><div><FontAwesomeIcon className='mx-2' icon={faDatabase}/>Submissions</div></NavLink>
        </div>
        </div>
      <div>
        <Button variant='light' onClick={toggleDrawer}><span className="navbar-toggler-icon fs-5"></span></Button>
      </div>
    </div>
  );
}

export default Drawer;
