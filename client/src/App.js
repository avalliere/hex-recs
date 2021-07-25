import React, { useState } from 'react';
import './App.css';
import Color from './components/Color';

function App() {

  const [recs, setRecs] = useState([])
  const [selectedColor, setSelectedColor] = useState()

  const paramLookup = {
    '#f5f0af': { min_tempo: 140 },
    '#0f50af': { min_tempo: 80 }
  }

  const getSpotifyRecs = async () => {
    const params = paramLookup[selectedColor];

    await fetch('/recommendations?' + new URLSearchParams({
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
      <button onClick={() => getSpotifyRecs()}>Get recs</button>
      <Color selectedColor={selectedColor} setSelectedColor={setSelectedColor} colorHex='#f5f0af' />
      <Color selectedColor={selectedColor} setSelectedColor={setSelectedColor} colorHex='#0f50af' />
     {recs?.map(rec=> {
      return(
        <p key={rec.id}>{rec.artists[0].name} : {rec.name}</p>
      )
    })}   
    </div>
  );
}

export default App;
