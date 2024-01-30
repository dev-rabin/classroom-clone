import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import "./widgets.css";

function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Drawer Menu</h2>
          <button className="close-btn" onClick={toggleDrawer}>
            &times;
          </button>
        </div>
        <ul className="drawer-menu">
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </div>
      <div className="main">
      <Button variant='light' onClick={toggleDrawer}><span className="navbar-toggler-icon fs-5 mx-2"></span></Button>
      </div>
    </div>
  );
}

export default Drawer;
