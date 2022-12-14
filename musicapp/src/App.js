import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './home';
import Playlist from './playlist'
import LoginScreen from './loginScreen';
import CreateUserScreen from './createUserScreen';
import Users from './users';
import Artists from './artists';
import Albums from './albums'


function App(){

    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/playlists' element={<Playlist />} />
            <Route path='/users' element={<Users />} />
            <Route path='/artists' element={<Artists />} />
            <Route path='/albums' element={<Albums />} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<CreateUserScreen />} />
            <Route path='/' element={<LoginScreen />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;