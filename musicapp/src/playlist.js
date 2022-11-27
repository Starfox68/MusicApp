import React, { useEffect, useState } from 'react';
import './App.css';
import PlaylistBar from './playlistBar';
import axios from 'axios';
import List from '@mui/material/List';
import { useLocation } from 'react-router-dom';

function Playlist() {

  // State
  const [playlists, setPlaylists] = useState([]);

  const {state} = useLocation();
  const {username} = state;

  // Load user playlists on first page load
  useEffect(() => {
    retrievePlaylists() 
  }, [])

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
        />
      ))
    })
  }

  return (
    <div className="App">
      <h1>Your Playlists</h1>
      <List>
        {playlists}
      </List>
    </div>
  )
}

export default Playlist;