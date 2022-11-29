import React, { useEffect, useState } from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import axios from 'axios';
import { MenuItem, Grid, ListItem, ListItemSecondaryAction, ListItemText, Divider, Select, Fade, IconButton, InputLabel } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CloseIcon from '@mui/icons-material/Close';

function UserSongBar({songID, title, releaseDate, refreshSongsCallback}){


  return (
    <ListItem sx={{borderBottom: 1}}>
      <ListItemText primary={title} secondary={"Released: " + releaseDate}/>
    </ListItem>
  );
}

export default UserSongBar;