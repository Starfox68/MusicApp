import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';  
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check'; 
import axios from 'axios';

function SongBar({songID, title, releaseDate, likes, username, userLikes}){

  const [likeCount, setLikeCount] = useState(likes);
  const [selected, setSelected] = useState(userLikes);

  useEffect(() => {
    setLikeCount(likes)
    setSelected(userLikes)
  }, [likes, userLikes]);

  const likeSong = async () => {
    axios.post('http://localhost:5001/like-song', {
      selected: !selected,
      songID: songID,
      username: username
    })
  }

  return (
    <Grid container alignItems="center" style={{backgroundColor: '#b2c8eb', padding: 10, margin: 10}}>
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Divider orientation="vertical" flexItem style={{margin: 10}}/>
      <Grid item style={{padding: 10}}>
        <Typography>{releaseDate}</Typography>
      </Grid>
      <Divider orientation="vertical" flexItem style={{margin: 10}}/>
      <Grid item>
        <Typography>{likeCount}</Typography>
      </Grid>
      <Divider orientation="vertical" flexItem style={{margin: 10}}/>
      <Grid item>
      <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected) 
            likeSong()
            setLikeCount(likeCount + ((selected) ? -1 : 1))
          }}
        >
        <CheckIcon/>
      </ToggleButton>
      </Grid>
    </Grid>
  );
}

export default SongBar;