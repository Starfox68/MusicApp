import React, { useEffect, useState } from 'react';
import './App.css';
import PlaylistBar from './playlistBar';
import axios from 'axios';
import List from '@mui/material/List';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ResponsiveAppBar from './navBar';

function Playlist() {

  // State
  const [playlists, setPlaylists] = useState([]);

  const {state} = useLocation();
  const {username} = state;

  // Load user playlists on first page load
  useEffect(() => {
    retrievePlaylists() 
  }, [])

  const createPlaylist = async() => {
    axios.post('http://localhost:5001/playlist-create', {
      username: username
    }).then((response) => {
      retrievePlaylists()
    })
  }

  const refreshPlaylistCallback = () => {
    retrievePlaylists()
  }

  const retrievePlaylists = async () => {
    axios.post('http://localhost:5001/playlist-get', {
      username: username
    }).then((response) => {
      const body = response.data;
      console.log(body)

      setPlaylists(body.result.map((playlist) =>
        <PlaylistBar
          username = {username}
          playlistID = {playlist.playlistID}
          date = {playlist.dateCreated}
          name = {playlist.name}
          refreshPlaylistCallback = {refreshPlaylistCallback}
        />
      ))
    })
  }

  return (
    <>
    <ResponsiveAppBar uname={username}/>
      <div className="App">
        <h1>Your Playlists</h1>
        <Button variant="outlined" onClick={createPlaylist}>Create</Button>
        <List>
          {playlists}
        </List>
    </div>
    </>
  )
}

export default Playlist;