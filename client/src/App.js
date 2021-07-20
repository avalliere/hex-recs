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



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h1>API Response: {api}</h1>
    </div>
  );
}

export default App;
