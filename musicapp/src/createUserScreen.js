import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function CreateUserScreen(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [showError, setShowError] = useState(false)

    const handleUsernameChange = e => {
        setUsername(e.target.value)
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };
    
    const handleFirstChange = e => {
        setFirstName(e.target.value);
    };

    const handleLastChange = e => {
        setLastName(e.target.value);
    };

    const navigate = useNavigate();

    const makeUser = async () => {
        axios.post('http://localhost:5001/make-new-user', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }).then((response) => {
            if (response.data === "ERROR"){
                setShowError(true)
            }else if (response.data === "SUCCESS"){
                setShowError(false)
                navigate('/')
            }
        })
      };

    return (
        <Box sx={{ width: '20%' }}>
            <Stack spacing={2}>
                <TextField label="First Name" variant="outlined" value={firstName} onChange={handleFirstChange}/>
                <TextField label="Last Name" variant="outlined" value={lastName} onChange={handleLastChange}/>
                <TextField label="Username" variant="outlined" value={username} onChange={handleUsernameChange}/>
                <TextField label="Password" variant="outlined" value={password} onChange={handlePasswordChange}/>
                <Button variant="outlined" style={{margin: 10}} onClick={makeUser}>Create User</Button>
                {showError? <Typography color={"#FF0000"}> Username is already in use! </Typography> : <Typography color={"#FFFFFF"}> Username is already in use! </Typography>}  
            </Stack>
        </Box>
    );
}

export default CreateUserScreen;