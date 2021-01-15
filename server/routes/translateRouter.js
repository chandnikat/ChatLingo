const express = require('express');
// const userController = require('../controllers/userController');
const router = express.Router();
require('dotenv').config();
const authController = require('../controllers/authController');

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: `${process.env.TRANSLATION_VERSION}`,
  authenticator: new IamAuthenticator({
    apikey: `${process.env.TRANSLATION_KEY}`,
  }),
  serviceUrl: `${process.env.TRANSLATION_URL}`,
});

router.post('/', authController.verifyJWT, (req, res, next) => {

  // next, we pass in parameters that are variable (from frontend inputs)

  // const translateParams = {
  //   text: 'Hello, how are you today?',
  //   modelId: 'en-es',
  // };

  // send us text, sl, el;


  // we need en es fr de 
  // we have en es fr de
  console.log(req.body);
  const text = req.body.search;
  const modelId = `${req.body.sourceLang}-${req.body.targetLang}`;

  const translateParams = { text, modelId }

  languageTranslator.translate(translateParams) // whatever we pass needs to be object with text and modelId keys
    .then((data) => {
      console.log('data', data);
      res.locals.translation = data.result.translations[0];
      console.log('translated word', res.locals.translation);
      return res.status(200).json(res.locals.translation)
    })
    .catch(err => {
      console.log('error:', err);
      return next({ message: { err: 'error in getting back a translation' } });
    })
})

module.exports = router;
