import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import UserSongBar from './userSongBar';
import ListItem from '@mui/material/Listitem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import { Fade, Grow, ListItemSecondaryAction, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';

function UserBar({username1, username2, refreshUserCallback}) {

  const [open, setOpen] = React.useState(false);
  const [songs, setSongs] = React.useState([])

  var hasOpened = false

  // Load mutual songs on first page load
  useEffect(() => {
    retrieveMutualSongs() 
  }, [])

  const onCollapseClick = () => {
    if (!hasOpened) {
      hasOpened = true
      retrieveMutualSongs()
      setOpen(!open)
    }
  };

  const refreshSongsCallback = () => {
    console.log("refresh song callback")
    retrieveMutualSongs()
  }

  const retrieveMutualSongs = async () => {
    axios.post('http://localhost:5001/mutual-song-likes-get', {
      username1: username1,
      username2: username2,
    }).then((response) => {
      const body = response.data;
      console.log(body)
      setSongs(body.result.map((song) =>
        <UserSongBar 
          songID = {song.songID}
          title = {song.title}
          releaseDate = {song.releaseDate}
          refreshSongsCallback = {refreshSongsCallback}
        />)
      )

    })
  };

  return (
    <div>
      <ListItem onClick={onCollapseClick} style={{backgroundColor: '#87cefa'}}>
        <ListItemText primary = {username2} secondary= {"number of mutual songs: " + songs.length} />
        <ListItemSecondaryAction>
          <Fade>
            <TextField defaultValue={username2} style={{paddingRight: 10}}>
            </TextField>
          </Fade>
          {open ? <IconButton onClick={onCollapseClick}><ExpandLess /></IconButton> : 
            <IconButton onClick={onCollapseClick}><ExpandMore /></IconButton>}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open}>
        <div>
          {songs}
        </div>
      </Collapse>
    </div>
  )
}

export default UserBar;