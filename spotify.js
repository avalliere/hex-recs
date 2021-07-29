const querystring = require('querystring');
const axios = require('axios');

const ORANGE = '#f0826c';
const GREEN = '#98f06c';
const TEAL = '#6cdaf0';
const BLACK = '#160c1b';
const PURPLE = '#8f6cf0';
const NEW_ORDER = '0yNLKJebCb8Aueb54LYya3';
const AGE_OF_CONSENT = '2EEinN4Zk8MUv4OQuLsTBj';
const FLEET_FOXES = '4EVpmkEwrLYEg6jIsiPMIb';
const VELVET_UNDERGROUND = '1nJvji2KIlWSseXRSlNYsC';
const ANIMAL_COLLECTIVE = '4kwxTgCKMipBKhSnEstNKj';
const PIXIES = '6zvul52xwTWzilBZl6BUbT';
const RAMONES = '1co4F2pPNH8JjTutZkmgSm';
const KILLING_MOON = '15049rGLXHwrWtE4euUb5C';
const JESUS_MARY_CHAIN = '4rjlerN21ygkIhmUv55irs';
const SIOUXSIE_BANSHEES = '1n65zfwYIj5kKEtNgxUlWb';
const STEVIE_NICKS = '7crPfGd2k81ekOoSqQKWWz';

const queryParamsString = {
  '#f0826c': `&seed_artists=${ANIMAL_COLLECTIVE},${RAMONES}&min_energy=0.6&min_danceability=0.7&min_valence=0.7`,
  '#98f06c': `&seed_artists=${PIXIES},${RAMONES}&min_valence=0.6&min_energy=0.7`,
  '#6cdaf0': `&seed_tracks=${AGE_OF_CONSENT}&seed_artists=${FLEET_FOXES},${VELVET_UNDERGROUND}&min_valence=0.7`,
  '#160c1b': `&seed_tracks=${KILLING_MOON}&seed_artists=${JESUS_MARY_CHAIN},${SIOUXSIE_BANSHEES}&max_valence=0.2`,
  '#8f6cf0': `&seed_artists=${STEVIE_NICKS},${SIOUXSIE_BANSHEES}&mode=0&max_valence=0.3&max_energy=0.3`,
};

const getSpotifyToken = async () => {
  const encodedAuth = new Buffer(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64');
  const authOptions = {
    headers: {
      Authorization: `Basic ${encodedAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };

  const data = querystring.encode({ grant_type: 'client_credentials' });

  const token = await axios
    .post('https://accounts.spotify.com/api/token', data, authOptions)
    .then((res) => {
      const accessToken = res.data.access_token;
      return accessToken;
    })
    .catch((err) => {
      return err;
    });

  return token;
};

const getRecs = async (token, query) => {
  const { selectedColor } = query;

  const recsHeaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const recs = await axios
    .get(
      `https://api.spotify.com/v1/recommendations?limit=7${queryParamsString[selectedColor]}`,
      recsHeaders
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err.body);
    });

  return recs;
};

module.exports = { getSpotifyToken, getRecs };
