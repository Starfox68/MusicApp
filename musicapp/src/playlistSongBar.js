import React, { useEffect, useState } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import axios from 'axios';
import { MenuItem, Grid, ListItem, ListItemSecondaryAction, ListItemText, Divider, Select, Fade, IconButton, InputLabel } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CloseIcon from '@mui/icons-material/Close';

function PlaylistSongBar({playlistID, songID, title, releaseDate, likes, username, userLikes, refreshSongsCallback}){

  const secondaryActionStyle = {
    margin: '0 auto',
    padding: 10
  }

  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(userLikes);

  useEffect(() => {
    setLikeCount(likes)
    setLiked(userLikes)
  }, [likes, userLikes]);

  const onRemoveSong = () => {
    console.log(songID)
    console.log(playlistID)
    console.log(username)
    axios.post('http://localhost:5001/playlist-remove-song', {
      songID: songID,
      playlistID: playlistID,
      username: username
    }).then((response) => {
      console.log("song removed")
      refreshSongsCallback()
    })
  }

  const onLike = () => {
    setLiked(!liked) 
    likeSong()
    setLikeCount(likeCount + ((liked) ? -1 : 1))
  }

  const likeSong = async () => {
    axios.post('http://localhost:5001/like-song', {
      selected: !liked,
      songID: songID,
      username: username
    })
  }

  return (
    <ListItem sx={{borderBottom: 1}}>
      <ListItemText primary={title} secondary={"Released: " + releaseDate}/>
      <ListItemSecondaryAction >
        <Grid direction="row" alignItems="center" justifyContent="center" container>
          <IconButton style={secondaryActionStyle} onClick={onRemoveSong}>
            <CloseIcon/>
          </IconButton>
          <Divider orientation='vertical'></Divider>
          <Typography style={secondaryActionStyle}>{"Likes: " + likeCount}</Typography>
          <IconButton
            style={secondaryActionStyle}
            onClick={onLike}>
            {liked ? <ThumbUpIcon/> : <ThumbUpOffAltIcon/>}
          </IconButton>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default PlaylistSongBar;