const express = require('express');
const router = express.Router();
require('dotenv').config();

const chatroomController = require('../controllers/chatroomController');
// const historyController = require('../controllers/historyController');

router.get(
  '/getAllChatrooms',
  chatroomController.getAllChatrooms,
  (req, res, next) => {
    return res.status(200).json(res.locals.chatrooms);
  }
);

module.exports = router;