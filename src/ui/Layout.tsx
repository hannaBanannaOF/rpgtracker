import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Logo from "../assets/img/menuIcon.png";
import { AppBar, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Home, Logout, ManageAccounts } from '@mui/icons-material';
import { GiTabletopPlayers } from "react-icons/gi";

export function Layout(props: any) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerToggle, setDrawerToggle] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

            setDrawerToggle(open);
        };

    const list = () => (
        <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        >
        <Toolbar />
        <List>
            <ListItem button key="home-menu-opt" onClick={() => {navigate("/")}}>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            {(auth.currentUser?.is_mestre ?? false) && <ListItem button key="minhas-mesas-menu-opt" onClick={() => {navigate("/minhas-mesas")}}>
                <ListItemIcon>
                    <GiTabletopPlayers />
                </ListItemIcon>
                <ListItemText primary="Minhas Mesas" />
            </ListItem>}
        </List>
        </Box>
    );

    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor='left'
                open={drawerToggle}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
            <Stack spacing={2} alignItems="center">
                <AppBar position="static" enableColorOnDark>
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
                        <img src={`${Logo}`} alt="logo" width={75}/>
                        <Typography variant="h6" component='span'>RPGTracker</Typography>
                    </Box>
                    <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                        <Avatar src={auth.currentUser?.photo ?? undefined} />
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => {window.location.href = process.env.REACT_APP_PROFILE_PAGE_URL!; handleClose();}}>
                            <ListItemIcon>
                                <ManageAccounts fontSize="small"/>
                            </ListItemIcon>
                            Perfil
                        </MenuItem>
                        <MenuItem onClick={() => {auth.signout().then(() => {
                            navigate("/login");
                            handleClose();
                        }); }}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                    </Toolbar>
                </AppBar>
                <Container>
                    {props.children}
                </Container>
            </Stack>
        </React.Fragment>
    );
}