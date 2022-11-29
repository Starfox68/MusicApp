import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import SongBar from './songBar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, List } from '@mui/material';
import ResponsiveAppBar from './navBar';

// Main search page
function Home(){

  // State Variables
  const [allSongs, setAllSongs] = useState([]);
  const [displayedSongs, setDisplayedSongs] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {state} = useLocation();
  const {username} = state;
  const navigate = useNavigate();
  
  // Load all songs on first page load
  useEffect(() => {
    songTitleSearch() 
  }, []);

  const navigateToPlaylists = async() => {
    navigate('/playlists', {state: {username: username}})
  }

  const songTitleSearch = async () => {
    axios.post('http://localhost:5001/search-song-title', {
      songTitle: searchText,
      username: username
    }).then((response) => {
      const body = response.data;
      allSongs.length = 0

      const temp = []
      setAllSongs(temp)

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
        variant="outlined" 
        selected={sorted}
        onChange={() => {
          setSorted(!sorted)
          setDisplayedSongs(allSongs.slice(0).sort((s1, s2) => s2.props.likes - s1.props.likes))
        }}>
          sort
      </ToggleButton>
      <List>
      {sorted === false && <div>{allSongs}</div>}
      {sorted === true && <div>{displayedSongs}</div>}
      </List>
    </div>
    </>
  );
}

export default Home;