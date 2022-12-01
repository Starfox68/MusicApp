import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PlaylistSongBar from './playlistSongBar';
import ListItem from '@mui/material/Listitem';
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Fade, Grow, ListItemSecondaryAction, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import { ShareLocationRounded } from '@mui/icons-material';

function PlaylistBar({playlistID, name, date, username, refreshPlaylistCallback}) {

  const [open, setOpen] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState(name)
  const [renameOpen, setRenameOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [shareCode, setShareCode] = React.useState("")
  const [notifOpen, setNotifOpen] = React.useState(false)
  const [songs, setSongs] = React.useState([])

  var hasOpened = false

  const refreshSongsCallback = () => {
    console.log("refresh song callback")
    songTitleSearch()
  }

  useEffect(() => {
    setShareCode(window.btoa(username + ":" + playlistID))
  }, []);

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
    setShareOpen(false)
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

  const onShareClick = () => {
    setRenameOpen(false)
    if (!shareOpen) {
      // u  sername:playlistid we want to find last occurence
      setNotifOpen(true)
      navigator.clipboard.writeText(shareCode)
      console.log(shareCode)
      console.log(window.atob(shareCode))
    }
    setShareOpen(!shareOpen)
    
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

  const handleNotifClose = (event, reason) => {
    setNotifOpen(false);
  };

  return (
    <div>
      <ListItem style={{backgroundColor: '#87cefa'}}>
        <ListItemText primary = {name} secondary = {('Date created: ' + date)}/>
        <ListItemSecondaryAction>
          {shareOpen && <Fade in={shareOpen}>
            <TextField value={shareCode} style={{paddingRight: 10}}
              InputProps={{
              readOnly: true,
            }}>
            </TextField>
          </Fade>}
          {renameOpen && <Fade in={renameOpen}>
            <TextField defaultValue={name} onChange={onRenameChange} style={{paddingRight: 10}}>
            </TextField>
          </Fade>}
          <IconButton onClick={onShareClick}>
            <ShareIcon/>
          </IconButton>
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
      <Snackbar open={notifOpen} autoHideDuration={2000} message={"Copied playlist code"} onClose={handleNotifClose}>
      </Snackbar>
    </div>
  )
}

export default PlaylistBar;