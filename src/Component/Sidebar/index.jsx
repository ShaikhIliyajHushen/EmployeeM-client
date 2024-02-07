import * as React from 'react';
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { styled } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
// import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import './index.css'
import { useAuth0 } from '@auth0/auth0-react';
import { ChevronLeftOutlined, ChevronLeftRounded, Dashboard, DashboardOutlined, HomeMax, House, HouseOutlined, Image, Info, InfoOutlined, Settings } from '@mui/icons-material';

const Sidebar = () => {
    const drawerWidth = 240

    const { user, isAuthenticated, logout } = useAuth0();
    if (isAuthenticated) {
        console.log(user)
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }))

    const Drawer = styled(MuiDrawer, {
        shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
        "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: "border-box",
            ...(!open && {
                overflowX: "hidden",
                transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up("sm")]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }))

    const [open, setOpen] = React.useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }



    const [expanded, setExpanded] = useState(false);

    const handleAccordionClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    return (
        <>
            <AppBar position='absolute' open={open}>
                <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                        backgroundColor: 'black',
                        color:'white',
                    }}
                >
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: "36px",
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component='h1'
                        variant='h6'
                        color='inherit'
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Comming soon...
                    </Typography>
                    {user?.name}
                    <Box>
                        <img
                            alt="User Profile"
                            src={user?.picture}
                            style={{ width: '40px', height: '40px', borderRadius: '100%', marginTop: '7px', marginLeft: '7px' }}
                        />
                    </Box>
                    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        sx={{ color: 'white' }}
                    >
                        LogOut
                    </Button>
                </Toolbar>
            </AppBar>
            {/* Sidenav */}
            <Drawer variant='permanent' open={open}>
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>

                {/* <Divider /> */}
                {/* Sidenav List */}

                <List >
                    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                        <Box>
                            <ListItem key='Dashboard' component={NavLink} to='Dashboard'>
                                <ListItemIcon>
                                    <Dashboard sx={{color:'black !important'}}/>
                                </ListItemIcon>
                                <ListItemText sx={{color:'black !important'}} primary='Dashboard' />
                            </ListItem>

                            <ListItem key='Home' component={NavLink} to='Home'>
                                <ListItemIcon>
                                    <House sx={{color:'black !important'}}/>
                                </ListItemIcon>
                                <ListItemText sx={{color:'black !important'}} primary='Home' />
                            </ListItem>

                            <ListItem key='Details' component={NavLink} to='Details'>
                                <ListItemIcon>
                                    <Info sx={{color:'black !important'}}/>
                                </ListItemIcon>
                                <ListItemText sx={{color:'black !important'}} primary='Details' />
                            </ListItem>
                        </Box>
                        <Box sx={{ mt: '400px' }}>
                            <ListItem key='Setting' component={NavLink} to='Setting'>
                                <ListItemIcon>
                                    <Settings sx={{color:'black !important'}}/>
                                </ListItemIcon>
                                <ListItemText sx={{color:'black !important'}} primary='Setting' />
                            </ListItem>
                        </Box>
                    </Box>

                </List>
            </Drawer>
        </>
    )
}

export default Sidebar
