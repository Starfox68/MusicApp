import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import SongBar from './songBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Grid, List } from '@mui/material';
import ResponsiveAppBar from './navBar';

// Main search page
function Home(){

  // State Variables
  const [allSongs, setAllSongs] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {state} = useLocation();
  const {username} = state;
  
  // Load all songs on first page load
  useEffect(() => {
    songTitleSearch() 
  }, []);

  const onSort = async () => {
    axios.post('http://localhost:5001/search-song-title', {
      songTitle: searchText,
      username: username
    }).then((response) => {
      var body = response.data;
      if (!sorted) {
        body.result.sort((song1, song2) => song2.totalLikes - song1.totalLikes)
      }
      
      setAllSongs([])

      setAllSongs(body.result.map((song) =>
        <SongBar key={song.songID}
          songID={song.songID}
          title={song.title} 
          releaseDate={song.releaseDate} 
          likes={(song.totalLikes) ? song.totalLikes : 0} 
          username={username}
          userLikes={(song.userLikes === 1) ? true : false}
          artistName={song.name}>
        </SongBar>)
      )
      setSorted(!sorted)
    })
  };

  const songTitleSearch = async () => {
    axios.post('http://localhost:5001/search-song-title', {
      songTitle: searchText,
      username: username
    }).then((response) => {
      const body = response.data;

      setAllSongs([])

      setAllSongs(body.result.map((song) =>
        <SongBar key={song.songID}
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

  // if sorted=true, sort allSongs by likes field
  return (
    <>
      <ResponsiveAppBar uname={username} />
      <div className="App">
      <Grid container direction="row" alignItems="center" justifyContent="center" style={{paddingTop: '50px'}}>     
        <TextField id="outlined-basic" label="Search Song Title" variant="outlined" value={searchText} onChange={handleSearchTextChange} style={{width: '400px'}} />
        <Button variant="outlined" style={{margin: 10}} onClick={songTitleSearch}>Search</Button>
      </Grid>
      <h1>Songs:</h1>
      <ToggleButton 
        value="sorted"
        variant="outlined" 
        selected={sorted}
        onChange={onSort}>
          sort
      </ToggleButton>
      <List>
      {allSongs}
      </List>
    </div>
    </>
  );
}

export default Home;