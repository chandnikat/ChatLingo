const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Authorization, Origin, Content-Type, Accept'
  );
  return next();
});

router.post('/signup', userController.createUser, authController.generateJWT, (req, res) => {
  return res.status(200).json({
    user: res.locals.user,
    token: res.locals.token
  });
});

router.post('/checkusername', userController.checkUsername, (req, res) => {
  return res.status(200).json(res.locals.nameExists);
});

router.post('/signin', authController.verifyUser, authController.generateJWT, (req, res) => {
  // localStorage.setItem('currentUser', JSON.stringify(res.locals.token));
  return res.status(200).json({
    user: res.locals.user,
    token: res.locals.token
  });
});



module.exports = router;
