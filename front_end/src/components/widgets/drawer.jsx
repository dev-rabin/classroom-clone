// Import necessary dependencies
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText,Typography } from '@mui/material';
import {Button} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store.js/auth';
const DrawerMenu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {student} = useAuth();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    return (
        <div>
            <Button variant='light' onClick={toggleDrawer(true)}><span className="navbar-toggler-icon fs-5 mx-2"></span></Button>

            {/* Left-side Drawer */}
            <Drawer PaperProps={{
            sx: { width: "20%", padding: "30px", color:"black" },
          }} anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div className='profile-picture'>Photo</div>
            <Typography>{student ? student.studentData.email : "Your Email"}</Typography>
                <List>
                    <ListItem onClick={toggleDrawer(false)}>
                    <NavLink to= "/"><ListItemText primary="Home" /></NavLink>
                    </ListItem>
                    <ListItem onClick={toggleDrawer(false)}>
                    <NavLink to= "/about"><ListItemText primary="About" /></NavLink>
                    </ListItem>
                    <ListItem onClick={toggleDrawer(false)}>
                    <NavLink to= "/class"><ListItemText primary="Class" /></NavLink>
                    </ListItem>
                    <ListItem onClick={toggleDrawer(false)}>
                    <NavLink to= "/assignments"><ListItemText primary="Assignments" /></NavLink>
                    </ListItem>
                </List>
            </Drawer>
            {/* <div style={{ marginLeft: '240px', padding: '20px' }}>
                
                <Typography variant="h4" gutterBottom>
                    Welcome to Your App
                </Typography>
                <Typography variant="body1">
                    This is the main content of your application.
                </Typography>
            </div> */}
        </div>
    );
};

export default DrawerMenu;
