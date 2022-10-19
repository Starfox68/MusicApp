import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SongBar from './songBar';



function Home(){

  const [allSongs, setAllSongs] = useState('');
  
  
  const showData = async () => {
    const response = await fetch('/check-data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
  
    setAllSongs(body.result.map((song) =><SongBar name={song.songName} artist={song.artist} genre={song.genre}></SongBar>))
  };

    return (
      <div className="App">
        <TextField id="outlined-basic" label="Search" variant="outlined" />
        <Button variant="outlined" style={{margin: 100}} onClick={showData}>Show me the data</Button>
        <h1>Songs:</h1>
        {<div>{allSongs}</div>}
      </div>
    );
}

export default Home;