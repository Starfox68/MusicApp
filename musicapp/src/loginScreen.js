import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { Navigate, useNavigate } from "react-router-dom";
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

    const showData = async () => {
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


    return (
        <Box sx={{ width: '20%' }}>
            <Stack spacing={2}>
                <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={handleUsernameChange}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange}/>
                <Button variant="outlined" style={{margin: 10}} onClick={showData}>Login!</Button>
                {showError? <Typography color={"#FF0000"}> Enter a valid login </Typography> : <Typography color={"#FFFFFF"}> Enter a valid login </Typography>}
            </Stack>
        </Box>
    );
}

export default LoginScreen;