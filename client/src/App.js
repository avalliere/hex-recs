import React, { useState } from 'react';
import './App.css';
import Color from './components/Color';
import Track from './components/Track';

function App() {
  const [recs, setRecs] = useState([]);
  const [selectedColor, setSelectedColor] = useState();

  const getSpotifyRecs = async () => {
    const params = { selectedColor };
    await fetch('/recommendations?' + new URLSearchParams(params))
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
      <div className="track-list">
        {recs?.map((rec) => {
          return <Track key={rec.id} rec={rec} />;
        })}
      </div>
    </div>
  );
}

export default App;
