import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SongBar from './songBar';


function App(){

  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);

  const test = [{songName: "Despacito", artist: "Luis Fonsi", genre: "Cringe"},
  {songName: "Fortnite", artist: "Test", genre: "LOL"},
  {songName: "monkey", artist: "noises", genre: "loud"},
  {songName: "yeo", artist: "dis a", genre: "test"}]

  const allSongs = test.map((song) =><SongBar name={song.songName} artist={song.artist} genre={song.genre}></SongBar>)
  
  const showData = async () => {
    const response = await fetch('/check-data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
  
    setData(body);
    setHasData(true);
    console.log(body);
    return body;
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

export default App;