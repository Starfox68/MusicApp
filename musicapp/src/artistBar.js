import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import UserSongBar from './userSongBar';
import SongBar from './songBar';
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

function ArtistBar({artistID, name, username, totalLikes}) {

  const [open, setOpen] = React.useState(false);
  const [songs, setSongs] = React.useState([])

  var hasOpened = false

  // Load mutual songs on first page load
  useEffect(() => {
    retrieveAuthoredSongs() 
  }, [])

  const onCollapseClick = () => {
    if (!hasOpened) {
      hasOpened = true
      retrieveAuthoredSongs()
      setOpen(!open)
    }
  };

  const refreshSongsCallback = () => {
    console.log("refresh song callback")
    retrieveAuthoredSongs()
  }

  const retrieveAuthoredSongs = async () => {
    axios.post('http://localhost:5001/artist-songs-get', {
      artistID: artistID,
      username: username
    }).then((response) => {
      const body = response.data;
      setSongs(body.result.map((song) =>
        <UserSongBar key={song.songID}
          songID={song.songID}
          title={song.title} 
          releaseDate={song.releaseDate} 
          likes={(song.totalLikes) ? song.totalLikes : 0} 
          username={username}
          userLikes={(song.userLikes === 1) ? true : false}>
        </UserSongBar>
        )
      )

    })
  };
 

  return (
    <div>
      <ListItem onClick={onCollapseClick} style={{backgroundColor: '#87cefa'}}>
        <ListItemText primary = {name} secondary= {<div >{"number of songs: " + songs.length}<br></br>{"total likes: " + totalLikes}</div>} />
        <ListItemSecondaryAction>
          <Fade>
            <TextField defaultValue={name} style={{paddingRight: 10}}>
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

export default ArtistBar;