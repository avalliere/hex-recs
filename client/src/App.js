import React, { useState, useEffect } from 'react';
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
  })

  const getSpotifyRecs = async (params) => {
    const recs = await fetch('/recommendations?' + new URLSearchParams({
      ...params
    }))
    .then(res => res.json())
    .then(data => {
      console.log(data.recs.tracks)
      setRecs(data.recs.tracks)
    })
    .catch(err => {throw new Error(err)})
  }


  return (
    <div className="App">
      <button onClick={() => getSpotifyRecs({min_tempo: 140})}>Get token</button>
      <h1>API Response: {api}</h1>
      { recs?.map(rec=> {
        return(
          <p key={rec.id}>{rec.artists[0].name} : {rec.name}</p>
        )
      })}
    </div>
  );
}

export default App;
