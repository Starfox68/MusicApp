import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Typography, MenuItem, Grid, ListItem, ListItemSecondaryAction, ListItemText, Divider, Select, Fade, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Add from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function SongBar({songID, title, releaseDate, likes, username, userLikes}){

  const secondaryActionStyle = {
    margin: '0 auto',
    padding: 10
  }

  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(userLikes);
  const [artist, setArtist] = useState('');

  const [absentPlaylists, setAbsentPlaylists] = useState([]);
  const [isPlaylistMenuOpen, setIsPlaylistMenuOpen] = useState(false);

  useEffect(() => {
    setLikeCount(likes)
    setLiked(userLikes)
    getArtist()
  }, [likes, userLikes]);

  const addToPlaylist = async(playlistID) => {
    axios.post('http://localhost:5001/playlist-add-song', {
      songID: songID,
      playlistID: playlistID,
      username: username
    }).then((response) => {
      setIsPlaylistMenuOpen(false)
    })
  }

  const absentPlaylistSearch = async () => {
    axios.post('http://localhost:5001/playlist-get-not-containing', {
      songID: songID,
      username: username
    }).then((response) => {
      const body = response.data;

      setAbsentPlaylists(body.result.map((playlist) =>
        <MenuItem value={playlist.playlistID}>{playlist.name}</MenuItem>)
      )
      setIsPlaylistMenuOpen(!isPlaylistMenuOpen)
    })
  };

  const onSelectPlaylist = (event) => {
    addToPlaylist(event.target.value)
  }

  const onOpenPlaylistMenu = () => {
    absentPlaylistSearch()
  }

  const onLike = () => {
    likeSong()
  }

  const toYoutube = async () => {
    const searchText = String(title) + ' ' + String(artist) + ' lyrics'
    const encodedTitle = encodeURIComponent(searchText.trim())
    axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=' + encodedTitle + '&key=AIzaSyBdo7yrDURXX8hMMX2nBTUJQb9CbDPhAdU')
    .then((response) => {
      const url = 'https://youtube.com/watch?v=' + String(response.data.items[0].id.videoId)
      window.open(url, '_blank', 'noopener,noreferrer')
    })
  };

  const getLikeCount = async() => {
    axios.post('http://localhost:5001/get-song-likes', {
      songID: songID
    }).then((response) => {
      const body = response.data
      const totalLikes = body.result[0].totalLikes
      setLikeCount(totalLikes)
    })
  }

  const likeSong = async () => {
    axios.post('http://localhost:5001/like-song', {
      selected: !liked,
      songID: songID,
      username: username
    }).then((response) => {
      getLikeCount()
      setLiked(!liked)
    })
  }

  const getArtist = async() => {
    axios.post('http://localhost:5001/get-Artist', {
      songID: songID
    }).then((response) => {
      var allAuthors = ''
      response.data.result.forEach(e => {
        allAuthors = allAuthors + e.name.slice(0, -1) + ', '
      });
      allAuthors = allAuthors.slice(0, -2)
      setArtist(allAuthors)
    })
  }

  return (
    <ListItem sx={{borderBottom: 1}}>
      <ListItemText primary={title} secondary={"Released: " + releaseDate + " by Artist: " + artist}/>
      <ListItemSecondaryAction >
        <Grid direction="row" alignItems="center" justifyContent="center" container>
          <Fade in={isPlaylistMenuOpen}>
            <Select defaultValue="" style={{minWidth: 120}} autoWidth onChange={onSelectPlaylist}>
              {absentPlaylists}
            </Select>
          </Fade>
          <IconButton style={secondaryActionStyle} onClick={onOpenPlaylistMenu}>
            {isPlaylistMenuOpen ? <CloseIcon/> : <Add/>}
          </IconButton>
          <Divider orientation='vertical'></Divider>
          <Typography style={secondaryActionStyle}>{"Likes: " + likeCount}</Typography>
          <IconButton
            style={secondaryActionStyle}
            onClick={onLike}>
            {liked ? <ThumbUpIcon/> : <ThumbUpOffAltIcon/>}
          </IconButton>
          <IconButton onClick={toYoutube} >
          <PlayCircleIcon/>
          </IconButton>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default SongBar;