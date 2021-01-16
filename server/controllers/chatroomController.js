const db = require('../models/chationaryModel');
require('dotenv').config();

const chatroomController = {};

chatroomController.getAllChatrooms = (req, res, next) => {
  const retrieveChatroomsQuery = `SELECT * FROM "public"."Chatroom";`;
  db.query(retrieveChatroomsQuery)
    .then(data => {
      res.locals.chatrooms = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error getting saved chatroom data from database' },
      });
    });
};


module.exports = chatroomController;