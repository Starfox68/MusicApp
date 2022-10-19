import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SongBar from './songBar';
import axios from 'axios';



function Home(){

  const [allSongs, setAllSongs] = useState('');
  const [searchText, setSearchText] = useState('');
  
  
  const showData = async () => {
    axios.post('http://localhost:5001/check-data', {
      songTitle: searchText
    }).then((response) => {
      const body = response.data;
      setAllSongs(body.result.map((song) =><SongBar title={song.title} releaseDate={song.releaseDate}></SongBar>))
    })
  };

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
};

    return (
      <div className="App">
        <TextField id="outlined-basic" label="Search" variant="outlined" value={searchText} onChange={handleSearchTextChange} />
        <Button variant="outlined" style={{margin: 100}} onClick={showData}>Search Song Title</Button>
        <h1>Songs:</h1>
        {<div>{allSongs}</div>}
      </div>
    );
}

export default Home;