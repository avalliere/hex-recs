import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [api, apiState] = useState();
  useEffect(() => {
    callApi();
  })

  const callApi = async () => {
      const response = await fetch('/api/hello')
      const body = await response.json()

      if (response.status !== 200) throw Error(body.message)

      return apiState(body.express)
    }

  const getAuthToken = () => {
    fetch('/spotifyToken')
  }


  return (
    <div className="App">
      <button onClick={() => getAuthToken()}>Get token</button>
      <h1>API Response: {api}</h1>
    </div>
  );
}

export default App;
