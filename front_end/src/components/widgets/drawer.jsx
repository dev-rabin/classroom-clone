// Import necessary dependencies
import React, { useState } from 'react';
import { AppBar, Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import {Button} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import "../App.css"

const DrawerMenu = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    return (
        <div>
            <Button variant='light' onClick={toggleDrawer(true)}><span className="navbar-toggler-icon fs-5 mx-2"></span></Button>

            {/* Left-side Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button onClick={toggleDrawer(false)}>
                    <NavLink to= "/"><ListItemText primary="Home" /></NavLink>
                    </ListItem>
                    <ListItem button onClick={toggleDrawer(false)}>
                    <NavLink to= "/about"><ListItemText primary="About" /></NavLink>
                    </ListItem>
                    <ListItem button onClick={toggleDrawer(false)}>
                    <NavLink to= "/class"><ListItemText primary="Class" /></NavLink>
                    </ListItem>
                    <ListItem button onClick={toggleDrawer(false)}>
                    <NavLink to= "/assignments"><ListItemText primary="Assignments" /></NavLink>
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}

            
            {/* Your main content goes here */}
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
