import React, { useEffect, useState } from 'react';
import './App.css';
import Grid from '@mui/material/Grid';  
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check'; 

function SongBar({title, releaseDate, likes, userLikes}){
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    console.log("ANYTHING")
    if (userLikes === 1) {
      // console.log("WORKS")
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, []);

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
        <Typography>{likes}</Typography>
      </Grid>
      <Divider orientation="vertical" flexItem style={{margin: 10}}/>
      <Grid item>
      <ToggleButton
          value="check"
          selected={selected}
          onChange={() => {
            setSelected(!selected);
          }}
        >
        <CheckIcon/>
      </ToggleButton>
      </Grid>
    </Grid>
  );
}

export default SongBar;