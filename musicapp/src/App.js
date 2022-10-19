import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import User from './User';



function App(){

    return (
      <div className="App">

<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/users' element={<User />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
      </div>
    );
}

export default App;