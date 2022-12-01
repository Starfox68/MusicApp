import React, { useEffect, useState } from 'react';
import './App.css';
import PlaylistBar from './playlistBar';
import axios from 'axios';
import List from '@mui/material/List';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import ResponsiveAppBar from './navBar';
import Grid from '@mui/material/Grid';
import { Fade, TextField } from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';



function Playlist() {

  // State
  const [playlists, setPlaylists] = useState([]);
  const [importValue, setImportValue] = React.useState("")
  const [importOpen, setImportOpen] = React.useState(false);

  const {state} = useLocation();
  const {username} = state;

  // Load user playlists on first page load
  useEffect(() => {
    retrievePlaylists() 
  }, [])

  const onCreateClick = () => {
    createPlaylist("New Playlist")
  }

  const createPlaylist = async(name, callback = () => {}) => {
    axios.post('http://localhost:5001/playlist-create', {
      username: username,
      name: name
    }).then((response) => {
      retrievePlaylists(callback)
    })

  }

  const refreshPlaylistCallback = () => {
    retrievePlaylists()
  }

  const retrievePlaylists = async (callback) => {
    axios.post('http://localhost:5001/playlist-get', {
      username: username
    }).then((response) => {
      const body = response.data;
      console.log(body)

      setPlaylists(body.result.map((playlist) =>
        <PlaylistBar
          key = {playlist.playlistID}
          username = {username}
          playlistID = {playlist.playlistID}
          date = {playlist.dateCreated}
          name = {playlist.name}
          refreshPlaylistCallback = {refreshPlaylistCallback}
        />
      ))
      
      if (callback) callback(body)
    })
  }

  const onImportChange = (e) => {
    setImportValue(e.target.value)
  }

  const onImportClick = () => {
    if (importOpen) {
      importPlaylist()
    }
    setImportOpen(!importOpen)
  }

  const importPlaylist = async() => {
    const decoded = window.atob(importValue)
    const delimIndex = decoded.lastIndexOf(":")
    const decodedUsername = decoded.substring(0,delimIndex)
    const decodedPlaylistID = decoded.substring(delimIndex+1)

    const callback = async(body) => {
      const playlistID = body.result.at(body.result.length-1).playlistID
      
      // get songs
      axios.post('http://localhost:5001/playlist-get-songs', {
        username: decodedUsername,
        playlistID: decodedPlaylistID,
      }).then((response) => {
        const body = response.data;

        // add song
        body.result.forEach(song => {
          axios.post('http://localhost:5001/playlist-add-song', {
            songID: song.songID,
            playlistID: playlistID,
            username: username
          })
        })
      })

    }
    if (decodedUsername == username) {
      alert("Cannot import playlist from yourself")
    }
    else if (decodedUsername === "" || decodedPlaylistID === "") {
      alert("Invalid import code")
    }
    else { // make sure user can't share to themselves
      createPlaylist("Imported Playlist from " + decodedUsername, callback)
    }

    
    

  }

  return (
    <>
    <ResponsiveAppBar uname={username}/>
      <div className="App">
        <h1>Your Playlists</h1>
        <Grid container rowSpacing={1} justifyContent="center">
          <Grid container item columnSpacing={3} justifyContent="center">
            <Grid item>
              <Button variant="outlined" onClick={onCreateClick}>Create</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={onImportClick}>Import</Button>
            </Grid>
          </Grid>
          <Grid item>
          {importOpen &&
          <Fade in={importOpen}>
              <TextField label="Playlist code" onChange={onImportChange} style={{paddingRight: 10}}>
              </TextField>
            </Fade>}
          </Grid>
        </Grid>
        <List>
          {playlists}
        </List>
    </div>
    </>
  )
}

export default Playlist;