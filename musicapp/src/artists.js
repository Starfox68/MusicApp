import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import ArtistBar from './artistBar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, List } from '@mui/material';
import ResponsiveAppBar from './navBar';

// Main search page
function Artists(){

  // State Variables
  const [allArtists, setAllArtists] = useState([]);
  const [displayedArtists, setDisplayedArtists] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {state} = useLocation();
  const {username} = state;
  const navigate = useNavigate();
  
  // Load all songs on first page load
  useEffect(() => {
    artistSearch() 
  }, []);

  const navigateToPlaylists = async() => {
    navigate('/playlists', {state: {username: username}})
  }

  const artistSearch = async () => {
    axios.post('http://localhost:5001/search-artist', {
      artistName: searchText,
      username: username
    }).then((response) => {
      const body = response.data;

      const temp = []
      setAllArtists(temp)

      setAllArtists(body.result.map((artist) =>
        <ArtistBar 
          artistID={artist.artistID}
          name={artist.name} 
          username={username}
          totalLikes={artist.artistSongLikes}>
        </ArtistBar>)
      )
    })
  };

  const onSort = async () => {
    axios.post('http://localhost:5001/search-artist', {
      artistName: searchText,
      username: username
    }).then((response) => {
      var body = response.data;
      if (!sorted) {
        body.result.sort((artist1, artist2) => artist2.artistSongLikes - artist1.artistSongLikes)
      }

      const temp = []
      setAllArtists(temp)

      setAllArtists(body.result.map((artist) =>
        <ArtistBar 
          artistID={artist.artistID}
          name={artist.name} 
          username={username}
          totalLikes={artist.artistSongLikes}>
        </ArtistBar>)
      )
      setSorted(!sorted)
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
        <TextField id="outlined-basic" label="Search Artist Name" variant="outlined" value={searchText} onChange={handleSearchTextChange} style={{width: '400px'}} />
        <Button variant="outlined" style={{margin: 10}} onClick={artistSearch}>Search</Button>
      </Grid>
      <h1>Artists:</h1>
      <ToggleButton 
        value="sorted"
        variant="outlined" 
        selected={sorted}
        onChange={onSort}>
          sort
      </ToggleButton>
      <List>
      {allArtists}
      </List>
    </div>
    </>
  );
}

export default Artists;