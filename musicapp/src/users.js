import React, { useEffect, useState } from 'react';
import './App.css';
import UserBar from './userBar';
import axios from 'axios';
import List from '@mui/material/List';
import { useLocation } from 'react-router-dom';
import ResponsiveAppBar from './navBar';

function Users() {

  // State
  const [users, setUsers] = useState([]);

  const {state} = useLocation();
  const {username} = state;

  // Load user playlists on first page load
  useEffect(() => {
    retrieveUsers() 
  }, [])

  const retrieveUsers = async () => {
    axios.post('http://localhost:5001/users-get', {
      username: username
    }).then((response) => {
      const body = response.data;
      console.log(body)

      setUsers(body.result.map((user) =>
        <UserBar 
          key = {user.username}
          username1= {username}
          username2 = {user.username}
        />
      ).filter(user => username != user.props.username2))
    })
  }

  return (
    <>
    <ResponsiveAppBar uname={username}/>
      <div className="App">
        <h1>Users</h1>
        <List>
          {users}
        </List>
    </div>
    </>
  )
}

export default Users;