import React, { useState } from 'react';
import './App.css';
import Color from './components/Color';
import Track from './components/Track';
import cauldron from './assets/cauldron.gif';

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
      <h1>Hex-Recs</h1>
      <p>
        Manifest a playlist based on color. Pick your hex and cast the spell!
      </p>
      <section className="outer-flex">
        <section className="color-container">
          <Color
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            className="color-item"
            colorHex="#f0826c"
          />
          <Color
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            className="color-item"
            colorHex="#98f06c"
          />
          <Color
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            className="color-item"
            colorHex="#6cdaf0"
          />
          <Color
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            className="color-item"
            colorHex="#160c1b"
          />
          <Color
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            className="color-item"
            colorHex="#8f6cf0"
          />
          <button id="get-recs-button" onClick={() => getSpotifyRecs()}>
            {selectedColor ? 'Get Hex-Recs!' : 'Choose a Color...'}
          </button>
          <img className="cauldron-img" src={cauldron} />
        </section>
        {recs.length > 0 && (
          <section className="track-list">
            <button id="close-recs-button" onClick={() => setRecs([])}>
              X
            </button>
            {recs?.map((rec) => {
              return <Track key={rec.id} rec={rec} className="track-item" />;
            })}
          </section>
        )}
      </section>
    </div>
  );
}

export default App;
