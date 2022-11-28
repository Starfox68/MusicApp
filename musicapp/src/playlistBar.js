import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
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
import SongBar from './songBar';
import { ListItemSecondaryAction } from '@mui/material';
import { Edit } from '@mui/icons-material';

function PlaylistBar({playlistID, name, date, username, refreshPlaylistCallback}) {

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

  const renamePlaylist = async() => {
    axios.post('http://localhost:5001/playlist-rename', {
      username: username,
      playlistID: playlistID
    }).then((response) => {
      refreshPlaylistCallback()
    })
  }

  const deletePlaylist = async() => {
    axios.post('http://localhost:5001/playlist-delete', {  
      username: username,
      playlistID: playlistID
    }).then((response) => {
      refreshPlaylistCallback()
    })
  }

  const songTitleSearch = async () => {
    axios.post('http://localhost:5001/playlist-get-songs', {
      username: username,
      playlistID: playlistID,
    }).then((response) => {
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
    <Grid container>
      <Grid item xs={11}>
        <ListItemButton onClick={onClick}>
          <ListItemText primary = {name} secondary = {('Date created: ' + date)}/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open}>
          <div>
            {songs}
          </div>
        </Collapse>
      </Grid>
      <Grid item>
        <IconButton>
          <EditIcon>
          </EditIcon>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={deletePlaylist}>
          <DeleteIcon>
          </DeleteIcon>
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default PlaylistBar;