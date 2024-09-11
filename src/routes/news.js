const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const facts = require('../../contents/interestingfacts');

const lang = 'en';
const APIKEY = process.env.APIKEY || '89608f0340a1cdf229442ab5f144fd5b'; // Use provided API key for testing

// Helper function for error handling
function handleError(err, res) {
  if (err.response) {
    res.status(err.response.status).render(`${err.response.status}error`, { news: null });
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    res.render('usernews', { news: null });
    console.log(err.request);
  } else {
    res.render('500error', { news: null });
    console.log('Error', err.message);
  }
}

// General news route
router.get('/', async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://gnews.io/api/v4/top-headlines?&lang=${lang}&token=${APIKEY}`);
    await res.render('usernews', { news: newsAPI.data, facts });
  } catch (err) {
    handleError(err, res);
  }
});

// Example for sports news
router.get('/news/sports', async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://gnews.io/api/v4/top-headlines?&token=${APIKEY}&topic=sports&lang=${lang}`);
    await res.render('usernews', { news: newsAPI.data, facts });
  } catch (err) {
    handleError(err, res);
  }
});

// Repeat similar structure for other news routes...
// ...

// Search news route
router.post('/news/search', async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://gnews.io/api/v4/search?q="${req.body.search}"&token=${APIKEY}&lang=${lang}`);
    await res.render('usernews', { news: newsAPI.data, facts });
  } catch (err) {
    handleError(err, res);
  }
});

module.exports = router;
