const express = require('express');
const path = require('path');
require('dotenv').config();
const { json } = require('express');
const { getSpotifyToken, getRecs } = require('./spotify');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/recommendations', async function (req, res) {
  const query = req.query;
  let token = await getSpotifyToken();
  let recs = await getRecs(token, query);
  res.status(200).json({ recs: recs?.data });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
