import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PlaylistSongBar from './playlistSongBar';
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

function PlaylistBar({playlistID, name, date, username, refreshPlaylistCallback}) {

  const [open, setOpen] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState(name)
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [songs, setSongs] = React.useState([])

  var hasOpened = false

  const refreshSongsCallback = () => {
    console.log("refresh song callback")
    songTitleSearch()
  }

  const onCollapseClick = () => {
    if (!hasOpened) {
      hasOpened = true
      songTitleSearch()
    }
  };

  const onRenameChange = e => {
    setRenameValue(e.target.value);
  };

  const onRenameClick = () => {
    setRenameOpen(!renameOpen)
    if (renameOpen) {
      renamePlaylist()
    }
  }

  const renamePlaylist = async() => {
    axios.post('http://localhost:5001/playlist-rename', {
      username: username,
      playlistID: playlistID,
      name: renameValue
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
      
      setSongs(body.result.map((song) =>
        <PlaylistSongBar
          playlistID={playlistID}
          songID={song.songID}
          title={song.title}
          releaseDate={song.releaseDate}
          username={username}
          likes={(song.totalLikes) ? song.totalLikes : 0}
          userLikes={(song.userLikes === 1) ? true : false}
          refreshSongsCallback={refreshSongsCallback}>
        </PlaylistSongBar>)
      )

      setOpen(!open);
    })
  };

  return (
    <div>
      <ListItem style={{backgroundColor: '#87cefa'}}>
        <ListItemText primary = {name} secondary = {('Date created: ' + date)}/>
        <ListItemSecondaryAction>
          <Fade in={renameOpen}>
            <TextField defaultValue={name} onChange={onRenameChange} style={{paddingRight: 10}}>
            </TextField>
          </Fade>
          <IconButton onClick={onRenameClick}>
            <EditIcon>
            </EditIcon>
          </IconButton>
          <IconButton onClick={deletePlaylist}>
            <DeleteIcon>
            </DeleteIcon>
          </IconButton>
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

export default PlaylistBar;