const express = require('express');
require('dotenv').config()
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/spotifyToken', function (req, res) {
    const encodedAuth = new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    const authOptions = {
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };

    const data = querystring.encode({grant_type: 'client_credentials'})

    axios.post('https://accounts.spotify.com/api/token', data, authOptions)
      .then(res => {
        const accessToken = res.data.access_token
        return accessToken
      }).catch(err => {
        return err
      })
  });

app.listen(port, () => console.log(`Listening on port ${port}`));