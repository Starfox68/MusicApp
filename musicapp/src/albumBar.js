import React, { useEffect, useState } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import axios from 'axios';
import { MenuItem, Grid, ListItem, ListItemSecondaryAction, ListItemText, Divider, Select, Fade, IconButton, InputLabel } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import SongBar from './songBar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

function AlbumBar({albumID, name, likes, username, userLikes}){

  const secondaryActionStyle = {
    margin: '0 auto',
    padding: 10
  }

  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(userLikes);

  const [open, setOpen] = React.useState(false);
  const [songs, setSongs] = React.useState([]);

  var hasOpened = false;

  useEffect(() => {
    setLikeCount(likes)
    setLiked(userLikes)
  }, [likes, userLikes]);

  useEffect(() => {
    retrieveAlbumSongs() 
  }, []);

  const onLike = () => {
    likeAlbum().then( () => {
      getAlbumLikeCount()
      setLiked(!liked)
    })
  }

  const getAlbumLikeCount = async() => {
    axios.post('http://localhost:5001/get-album-likes', {
      albumID: albumID
    }).then((response) => {
      const body = response.data
      const totalLikes = body.result[0].totalLikes
      setLikeCount(totalLikes)
    })
  }

  const likeAlbum = async () => {
    axios.post('http://localhost:5001/like-album', {
      selected: !liked,
      albumID: albumID,
      username: username
    })
  }

  const refreshSongsCallback = () => {
    console.log("refresh song callback")
    retrieveAlbumSongs()
  }

  const retrieveAlbumSongs = async () => {
    axios.post('http://localhost:5001/album-songs-get', {
      albumID: albumID,
      username: username
    }).then((response) => {
      const body = response.data;
      setSongs(body.result.map((song) =>
        <SongBar key={song.songID}
          songID={song.songID}
          title={song.title} 
          releaseDate={song.releaseDate} 
          likes={(song.totalLikes) ? song.totalLikes : 0} 
          username={username}
          userLikes={(song.userLikes === 1) ? true : false}>
        </SongBar>
        )
      )

    })
  };

  const onCollapseClick = () => {
    if (!hasOpened) {
      hasOpened = true
      retrieveAlbumSongs()
      setOpen(!open)
    }
  };

  return (
    <div>
      <ListItem sx={{borderBottom: 1}} onClick={onCollapseClick} style={{backgroundColor: '#87cefa'}}>
        <ListItemText primary={name.slice(0, -9)} secondary={albumID}/>
        <ListItemSecondaryAction >
            <Grid direction="row" alignItems="center" justifyContent="center" container>
            <Divider orientation='vertical'></Divider>
            <Typography style={secondaryActionStyle}>{"Likes: " + likeCount}</Typography>
            <IconButton
                style={secondaryActionStyle}
                onClick={onLike}>
                {liked ? <ThumbUpIcon/> : <ThumbUpOffAltIcon/>}
            </IconButton>
            <IconButton>
            </IconButton>
            </Grid>
            {open ? <IconButton onClick={onCollapseClick}><ExpandLess /></IconButton> : 
                <IconButton onClick={onCollapseClick}><ExpandMore /></IconButton>}
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open}>
        <div>
          <label>Songs:</label>
          <div>{songs}</div>
        </div>
      </Collapse>
    </div>
    
  );
}

export default AlbumBar;