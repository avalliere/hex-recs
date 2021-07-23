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

  const [recs, setRecs] = useState([])
  useEffect(() => {
    // getSpotifyRecs();
  })

  const getSpotifyRecs = async () => {
    const recs = await fetch('/recommendations')
    .then(res => res.json())
    .then(data => {
      console.log(data.recs.tracks)
      setRecs(data.recs.tracks)
      // return data
    })
    .catch(err => {throw new Error(err)})
    // console.log('recs', recs)
  }


  return (
    <div className="App">
      <button onClick={() => getSpotifyRecs()}>Get token</button>
      <h1>API Response: {api}</h1>
      { recs?.map(rec=> {
        console.log('-----REACT rec', rec)
        return(
          <p>{rec.name}</p>
        )
      })}
    </div>
  );
}

export default App;
