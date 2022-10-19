import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



function songBar({name, artist, genre}){
    return (
        <Grid container alignItems="center" style={{backgroundColor: '#D3D3D3', padding: 10, margin: 10}}>
          <Grid item>
            <Typography>{name}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem style={{margin: 10}}/>
          <Grid item style={{padding: 10}}>
            <Typography>{artist}</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem style={{margin: 10}}/>
          <Grid item>
            <Typography>{genre}</Typography>
          </Grid>
        </Grid>
    );
}

export default songBar;