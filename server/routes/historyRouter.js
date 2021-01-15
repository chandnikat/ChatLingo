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
    return res.status(200).json('translation saved!');
  }
);

router.post('/saveDefinition', authController.verifyJWT, historyController.saveDefinition, (req, res, next) => {
  return res.status(200).json('definition saved!');
})


module.exports = router;
