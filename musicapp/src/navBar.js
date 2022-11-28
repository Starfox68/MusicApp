import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar({uname}) {

const navigate = useNavigate();


const navTo = (param) => {
    if (param === "Home"){
      navigate('/home', {state: {username: uname}})
    }
    //TODO: Add when we have a users page
    // if (param == "Users"){
    //     navigate('/users')
    // }
    if (param === "Playlists"){
      navigate('/playlists', {state: {username: uname}})
    }
}

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button key="Home" onClick={() => navTo('Home')} sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button>
            <Button key="Users" onClick={() => navTo('Users')} sx={{ my: 2, color: 'white', display: 'block' }}>Users</Button>
            <Button key="Playlists" onClick={() => navTo('Playlists')} sx={{ my: 2, color: 'white', display: 'block' }}>Playlists</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;