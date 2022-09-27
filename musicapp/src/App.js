import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';


function App(){

  const [data, setData] = useState([]);
  const [hasData, setHasData] = useState(false);

  const showData = async () => {
    const response = await fetch('/check-data');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    setData(body);
    setHasData(true);
    console.log(body);
    return body;
  }
  ;

  // callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message) 
  //   }
  //   return body;
  // };

    return (
      <div className="App">
        <Button variant="outlined" style={{margin: 100}} onClick={showData}>Show me the data</Button>
        <h1>Songs:</h1>
        <p> {hasData? data.result[0].songName : "" } </p>
        <p> {hasData? data.result[1].songName : "" } </p>
        <p> {hasData? data.result[2].songName : "" } </p>
      </div>
    );
}

export default App;