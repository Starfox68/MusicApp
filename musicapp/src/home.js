import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SongBar from './songBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Main search page
function Home(){

  // State Variables
  const [allSongs, setAllSongs] = useState('');
  const [searchText, setSearchText] = useState('');

  const {state} = useLocation();
  const {username} = state;
  
  // Load all songs on app launch
  useEffect(() => {
    songTitleSearch() 
  }, []);

  const songTitleSearch = async () => {
    axios.post('http://localhost:5001/search-song-title', {
      songTitle: searchText,
      username: username
    }).then((response) => {
      const body = response.data;
      console.log(body)
      setAllSongs([])
      setAllSongs(body.result.map((song) =>
        <SongBar 
          songID={song.songID}
          title={song.title} 
          releaseDate={song.releaseDate} 
          likes={(song.totalLikes) ? song.totalLikes : 0} 
          username={username}
          userLikes={(song.userLikes === 1) ? true : false}>
        </SongBar>)
      )
    })
  };

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  return (
    <div className="App">
      <TextField id="outlined-basic" label="Search" variant="outlined" value={searchText} onChange={handleSearchTextChange} />
      <Button variant="outlined" style={{margin: 100}} onClick={songTitleSearch}>Search Song Title</Button>
      <h1>Songs:</h1>
      {<div>{allSongs}</div>}
    </div>
  );
}

export default Home;