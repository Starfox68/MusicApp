import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function LoginScreen(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const handleUsernameChange = e => {
        setUsername(e.target.value)
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();

    const validateLogin = async () => {
        axios.post('http://localhost:5001/check-login', {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.result.length === 0){
                setShowError(true)
            }else{
                setShowError(false)
                navigate('/home')
            }
        })
      };

      const createNavigation = async () => {
        navigate('/create')
      };

    return (
        <Box sx={{ width: '20%' }}>
            <Stack spacing={2}>
                <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={handleUsernameChange}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange}/>
                <Button variant="outlined" style={{margin: 10}} onClick={validateLogin}>Login!</Button>
                {showError? <Typography color={"#FF0000"}> Enter a valid login </Typography> : <Typography color={"#FFFFFF"}> Enter a valid login </Typography>}
                <Button variant="outlined" style={{margin: 10}} onClick={createNavigation}>Create User</Button>
            </Stack>
        </Box>
    );
}

export default LoginScreen;