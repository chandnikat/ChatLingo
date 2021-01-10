const express = require('express');
// const userController = require('../controllers/userController');
const router = express.Router();

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const url = 'https://api.us-east.language-translator.watson.cloud.ibm.com/instances/98d46fcf-9afc-464b-9aee-ff7f61d25118';
const version = '2018-05-01';
const key = 'ijjuSRkIm8qL6LkCARS1ewJfgl2Q7cCbXaoAdIqSWbjm'

const languageTranslator = new LanguageTranslatorV3({
  version: `${version}`,
  authenticator: new IamAuthenticator({
    apikey: `${key}`,
  }),
  serviceUrl: `${url}`,
});
console.log(languageTranslator);


router.post('/translateWord', (req, res, next) => {
  
  // next, we pass in parameters that are variable (from frontend inputs)

const translateParams = {
  text: 'Hello, how are you today?',
  modelId: 'en-es',
};

languageTranslator.translate(translateParams)
  .then(translationResult => {
    console.log(JSON.stringify(translationResult, null, 2));
    res.locals.translated = translationResult;
    console.log('translated word',res.locals.translated);
    return res.status(200).json(res.locals.translated);
  })
  .catch(err => {
    console.log('error:', err);
  });
})

module.exports = router;
