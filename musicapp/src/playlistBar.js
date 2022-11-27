import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SongBar from './songBar';

function PlaylistBar({playlistID, name, date, username}) {

  const [open, setOpen] = React.useState(false);
  const [songs, setSongs] = React.useState([])

  let hasOpened = false

  const onClick = () => {
    setOpen(!open);
    if (!hasOpened) {
      hasOpened = true
      songTitleSearch()
    }
  };

  const songTitleSearch = async () => {
    axios.post('http://localhost:5001/playlist-get-songs', {
      username: username,
      playlistID: playlistID,
    }).then((response) => {
      console.log(username)
      console.log(playlistID)
      const body = response.data;
      console.log(body)

      setSongs(body.result.map((song) =>
        <SongBar
          songID={song.songID}
          title={song.title}
          releaseDate={song.releaseDate}
          likes={(song.totalLikes) ? song.totalLikes : 0}
          userLikes={(song.userLikes === 1) ? true : false}>
        </SongBar>)
      )
    })
  };

  return (
    <div>
      <ListItemButton onClick={onClick}>
        <ListItemText primary = {name} secondary = {('Date created:' + date)}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <div>
          {songs}
        </div>
      </Collapse>
    </div>
  )
}

export default PlaylistBar;