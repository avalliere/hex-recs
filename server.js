const express = require('express');
require('dotenv').config()
const axios = require('axios');
const querystring = require('querystring');
const { json } = require('express');

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

// app.get('/spotifyToken', function (req, res) {
//   // TODO: update Buffer out of deprecated usage
//   const encodedAuth = new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
//   const authOptions = {
//     headers: {
//       Authorization: `Basic ${encodedAuth}`,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     json: true
//   };

//   const data = querystring.encode({grant_type: 'client_credentials'})

//   axios.post('https://accounts.spotify.com/api/token', data, authOptions)
//     .then(res => {
//       const accessToken = res.data.access_token
//       return accessToken
//     }).catch(err => {
//       return err
//     })
// });

const getSpotifyToken = async () => {
  const encodedAuth = new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
  const authOptions = {
    headers: {
      Authorization: `Basic ${encodedAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  };

  const data = querystring.encode({grant_type: 'client_credentials'})

  const token = await axios.post('https://accounts.spotify.com/api/token', data, authOptions)
    .then(res => {
      const accessToken = res.data.access_token
      return accessToken
    }).catch(err => {
      return err
    })
  
  return token;
}

app.get('/recommendations', async function (req, res) {
    const query = req.query;
    let token = await getSpotifyToken()
    let recs = await getRecs(token, query)   
    res.status(200).json({ recs: recs?.data })
});

const getRecs = async (token, query) => {
  const seedArtists = '4NHQUGzhtTLFvgF5SZesLK'
  const recsHeaders = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }

  const params = Object.entries(query).map( keyValPair => {
    const [ key, val ] = keyValPair;
    return `&${key}=${val}`;
  }).join().replace(',', '');

  console.log('PARAMS', params)
  
  const recs = await axios.get(`https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists}${params}`, recsHeaders)
    .then(res => {
      return res;
    }).catch(err => {
      throw new Error(err)
  })

  return recs;
}


app.listen(port, () => console.log(`Listening on port ${port}`));