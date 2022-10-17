import React, { FlatList, Text, View, } from 'react';

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function User(){

  const testData = [
    {
      id: '1',
      title: 'Rap',
      color: "f9c2ff",
      size: "5"
    },
    {
      id: '2',
      title: 'Bruh',
      color: "6e3b6e",
      size: "4",
    },
  ];

  
  // TODO: Translate fetched playlists from query into data structure
  const getPlaylists = async() => {
    const response = await fetch("/laylists")
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body
  }

  const playlistList = () => (
    <List>
      {testData.map((playlist) => 
        playlistItem(playlist.title, playlist.color, playlist.size)
      )}
    </List>
  )
  
  const playlistItem = (title, colour, size) => (
    <ListItemButton>
      <ListItemText primary = {title} secondary = {(size + ' songs')}/>
    </ListItemButton> 
  );

  return (
    playlistList()
  );
}

export default User;