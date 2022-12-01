import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import AlbumBar from './albumBar';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, List } from '@mui/material';
import ResponsiveAppBar from './navBar';

// Main search page
function Albums(){

  // State Variables
  const [allAlbums, setAllAlbums] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {state} = useLocation();
  const {username} = state;
  const navigate = useNavigate();
  
  // Load all songs on first page load
  useEffect(() => {
    albumNameSearch() 
  }, []);

  const navigateToPlaylists = async() => {
    navigate('/playlists', {state: {username: username}})
  }

  const albumNameSearch = async () => {
    axios.post('http://localhost:5001/search-album-name', {
      albumName: searchText,
      username: username
    }).then((response) => {
      const body = response.data;
      allAlbums.length = 0

      const temp = []
      setAllAlbums(temp)

      setAllAlbums(body.result.map((album) =>
        <AlbumBar 
          albumID={album.albumID}
          name={album.name} 
          likes={(album.totalLikes) ? album.totalLikes : 0} 
          username={username}
          userLikes={(album.userLikes === 1) ? true : false}>
        </AlbumBar>)
      )
    })
  };

  const onSort = async () => {
    axios.post('http://localhost:5001/search-album-name', {
      albumName: searchText,
      username: username
    }).then((response) => {
        var body = response.data;
        if (!sorted) {
            body.result.sort((album1, album2) => album2.totalLikes - album1.totalLikes)
        }
        
        const temp = []
        setAllAlbums(temp)

        setAllAlbums(body.result.map((album) =>
            <AlbumBar 
            albumID={album.albumID}
            name={album.name} 
            likes={(album.totalLikes) ? album.totalLikes : 0} 
            username={username}
            userLikes={(album.userLikes === 1) ? true : false}>
            </AlbumBar>)
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
        <TextField id="outlined-basic" label="Search Album Name" variant="outlined" value={searchText} onChange={handleSearchTextChange} style={{width: '400px'}} />
        <Button variant="outlined" style={{margin: 10}} onClick={albumNameSearch}>Search</Button>
      </Grid>
      <h1>Albums:</h1>
      <ToggleButton 
        value="sorted"
        variant="outlined" 
        selected={sorted}
        onChange={onSort}>
          sort
      </ToggleButton>
      <List>
      {allAlbums}
      </List>
    </div>
    </>
  );
}

export default Albums;