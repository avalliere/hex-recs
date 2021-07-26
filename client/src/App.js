import React, { useState } from 'react';
import './App.css';
import Color from './components/Color';

function App() {
  const [recs, setRecs] = useState([]);
  const [selectedColor, setSelectedColor] = useState();

  const paramLookup = {
    '#f0826c': { min_tempo: 140 },
    '#98f06c': { min_tempo: 80 },
    '#6cdaf0': {},
    '#160c1b': {},
    '#8f6cf0': {},
  };

  const getSpotifyRecs = async () => {
    // const params = paramLookup[selectedColor];
    const params = { selectedColor };
    // { selectedColor: '#...' }
    await fetch(
      '/recommendations?' +
        // new URLSearchParams({
        //   ...params,

        // })
        new URLSearchParams(params)
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.recs.tracks);
        setRecs(data.recs.tracks);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <div className="App">
      <button onClick={() => getSpotifyRecs()}>Get recs</button>
      <Color
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colorHex="#f0826c"
      />
      <Color
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colorHex="#98f06c"
      />
      <Color
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colorHex="#6cdaf0"
      />
      <Color
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colorHex="#160c1b"
      />
      <Color
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        colorHex="#8f6cf0"
      />
      {recs?.map((rec) => {
        return (
          <p key={rec.id}>
            {rec.artists[0].name} : {rec.name}
          </p>
        );
      })}
    </div>
  );
}

export default App;
