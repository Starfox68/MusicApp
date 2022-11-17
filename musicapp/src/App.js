import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './home';
import User from './User';
import LoginScreen from './loginScreen';
import CreateUserScreen from './createUserScreen';


function App(){

    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/users' element={<User />} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<CreateUserScreen />} />
            <Route path='/' element={<LoginScreen />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;