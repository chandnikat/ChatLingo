const express = require('express');
const router = express.Router();
require('dotenv').config();

const authController = require('../controllers/authController');
const historyController = require('../controllers/historyController');

router.get(
  '/getAllDefinitions',
  authController.verifyJWT,
  historyController.getAllDefinitions,
  (req, res, next) => {
    return res.status(200).json(res.locals.definitions);
  }
);

router.post('/saveDefinition', authController.verifyJWT, historyController.saveDefinition, (req, res, next) => {
  return res.status(200).json('Definition saved!');
}
);

router.get(
  '/getAllTranslations',
  authController.verifyJWT,
  historyController.getAllTranslations,
  (req, res, next) => {
    return res.status(200).json(res.locals.translations);
  }
);

router.post(
  '/saveTranslation',
  authController.verifyJWT,
  historyController.saveTranslation,
  (req, res, next) => {
    return res.status(200).json('Translation saved!');
  }
);


router.get(
  '/getAllConversations',
  authController.verifyJWT,
  historyController.getAllConversations,
  (req, res, next) => {
    return res.status(200).json(res.locals.conversations);
  }
);

router.post(
  '/saveConversation',
  authController.verifyJWT,
  historyController.saveConversation,
  (req, res, next) => {
    return res.status(200).json('Conversation saved!');
  }
);




module.exports = router;
