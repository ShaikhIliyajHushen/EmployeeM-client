import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
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
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './index.css'
import { useAuth0 } from '@auth0/auth0-react';
import { ChevronLeftOutlined, ChevronLeftRounded, Dashboard, DashboardOutlined, HomeMax, House, HouseOutlined, Image, Info, InfoOutlined, Settings } from '@mui/icons-material';
// import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Barwin from '../../Assets/logo.png'


const Sidebar = () => {
    const drawerWidth = 240
    const navigate = useNavigate();
    // const { user, isAuthenticated, logout } = useAuth0();

    // if (isAuthenticated) {
    //     console.log(user)
    // }

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

    const [open, setOpen] = useState(true)
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout({ returnTo: window.location.origin }); // Ensure returnTo is correctly set
        localStorage.clear()
        handleClose();
    };

    // const TokenData = localStorage.getItem("Token")
    // const decodedToken = jwtDecode(TokenData)
    // const { firstName, lastName } = decodedToken;

    const [userData, setUserData] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();

    useEffect(() => {
        const initializeUserData = async () => {
            const TokenData = localStorage.getItem("Token");

            if (TokenData) {
                try {
                    const decodedToken = jwtDecode(TokenData);
                    setFirstName(decodedToken.firstName);
                    setLastName(decodedToken.lastName);
                } catch (error) {
                    console.error('Invalid token:', error);
                }
            } else if (isAuthenticated && user) {
                setFirstName(user.given_name || '');
                setLastName(user.family_name || '');
            }
        };

        initializeUserData();
    }, [isAuthenticated, user]);




    // const [expanded, setExpanded] = useState(false);

    // const handleAccordionClick = () => {
    //     setExpanded((prevExpanded) => !prevExpanded);
    // };
    return (
        <>
            <AppBar position='absolute' open={open}>
                <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed  #488A99
                        backgroundColor: 'white',
                        color: 'white',
                    }}
                >
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: "36px",
                            ...(open && { display: "none" }), color: 'black'
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>

                        <Box >
                            <Typography
                                component='h1'
                                variant='h6'
                                color='inherit'
                                noWrap
                                sx={{ flexGrow: 1, color: 'black' }}

                            >
                                <img src={Barwin} alt="" style={{ width: '40px', height: '40px', marginBottom: '6px', marginRight: '4px' }} />
                                arwin Box
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'black' }}>
                                {/* {user ? user.name : firstName + " " + lastName} */}

                                {firstName} {lastName}

                            </Box>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton onClick={handleAvatarClick}>
                                    <Avatar
                                        alt="User Profile"
                                        src={user?.picture}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    sx={{
                                        opacity: 1,
                                        transform: 'none',
                                        transition: 'opacity 207ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 138ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                        top: '51px !important',
                                        left: '1410px !important',  // Use right instead of left for right-side alignment
                                        // right: '0',  
                                        transformOrigin: '-16px -16px !important',
                                        position: 'absolute !important', // Ensure the menu is positioned absolutely
                                    }}
                                >
                                    <MenuItem
                                        onClick={handleLogout}
                                    >
                                        LogOut
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/Landing/Dashboard/Profile');
                                            handleClose();
                                        }}
                                    >
                                        Profile
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                    </Box>
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
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>

                {/* <Divider /> */}
                {/* Sidenav List */}
                {open ?
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, mt: 3 }}>
                        <Box>
                            <Avatar
                                alt="User Profile"
                                src={user?.picture}
                                sx={{ width: 80, height: 80 }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'black', mt: 2 }}>
                            {/* {user ? user.name : firstName + " " + lastName} */}
                            {firstName + " " + lastName}

                        </Box>
                    </Box>
                    : ''}
                <List >
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <Box>
                            {/* <ListItem key='Profile' component={NavLink} to='Profile'>
                                <ListItemIcon>
                                    <Info sx={{ color: 'black !important' }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: 'black !important' }} primary='Profile' />
                            </ListItem> */}
                            <ListItem key='Dashboard' component={NavLink} to='Dashboard'>
                                <ListItemIcon>
                                    <Dashboard sx={{ color: 'black !important' }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: 'black !important' }} primary='Dashboard' />
                            </ListItem>

                            <ListItem key='Home' component={NavLink} to='Home'>
                                <ListItemIcon>
                                    <House sx={{ color: 'black !important' }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: 'black !important' }} primary='Home' />
                            </ListItem>

                            <ListItem key='Details' component={NavLink} to='Details'>
                                <ListItemIcon>
                                    <Info sx={{ color: 'black !important' }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: 'black !important' }} primary='Details' />
                            </ListItem>

                        </Box>
                        {/* <Box sx={{ mt: '400px' }}>
                            <ListItem key='Setting' component={NavLink} to='Setting'>
                                <ListItemIcon>
                                    <Settings sx={{ color: 'black !important' }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: 'black !important' }} primary='Setting' />
                            </ListItem>
                        </Box> */}
                    </Box>

                </List>
            </Drawer>
        </>
    )
}

export default Sidebar
