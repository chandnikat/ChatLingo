const express = require('express');
const router = express.Router();
require('dotenv').config();
const https = require('https');

const authController = require('../controllers/authController');

// Oxford Dictionaries API
const APIID = process.env.APIID;
const APIKEY = process.env.APIKEY;
const language = 'en-us';
let wordId;
const strictMatch = 'false';

router.post('/', authController.verifyJWT, (req, res, next) => {
  wordId = req.body.vocab;

  const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: `/api/v2/entries/${language}/${wordId.toLowerCase()}?fields=definitions&strictMatch=${strictMatch}`,
    method: 'GET',
    headers: {
      app_id: APIID,
      app_key: APIKEY,
    },
  };

  https.get(options, resp => {
    let body = '';
    resp.on('data', d => {
      body += d;
    });
    resp.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.error) {
          return res.status(200).json(data.error);
        }
        const dictionaryResults = {
          definition:
            data.results[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0],
          partOfSpeech: data.results[0].lexicalEntries[0].lexicalCategory['id'],
        };
        console.log(dictionaryResults);
        return res.status(200).json(dictionaryResults);
      } catch (err) {
        return next({
          message: { err: 'An error occurred while searching for this word' },
        });
      }
    });
  });
});

module.exports = router;






















module.exports = router;