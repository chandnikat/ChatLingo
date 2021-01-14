const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json({
    user: res.locals.user,
  });
});

router.post('/signin', userController.verifyUser, (req, res) => {
  return res.status(200).json({
    user: res.locals.user,
  });
});

router.post('/checkusername', userController.checkUsername, (req, res) => {
  return res.status(200).json(res.locals.nameExists);
});

module.exports = router;
