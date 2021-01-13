const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const https = require('https');
require('dotenv').config();
const fetch = require('node-fetch');
// import languageTranslator from './ibm'

const app = express();
const PORT = process.env.PORT;

/**
 * require routers
 */

const authRouter = require('./routes/authRouter');
const translateRouter = require('./routes/translateRouter');
const authController = require('./controllers/authController');

/**
 * handle parsing request body
 */
app.use(express.json()); // recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({ extended: true })); //recognize the incoming Request Object as strings or arrays.

/**
 * Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
 *
 */
app.use(cookieParser());

//express server is serving all static assets found in your client folder & sending the images to the front end when it needs to find the images
/**
 * handle requests for static files
 */

app.use(express.static(path.join(__dirname, '../src')));

/**
 * define route handlers
 */

app.use('/auth', authRouter);
app.use('/translate', translateRouter);
app.use('/dictionary', (req, res, next) => {
  console.log('hello from dictionary');
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Authorization, Origin, Content-Type, Accept'
  );
  console.log('res headers', res);
  return next();
});

app.get('/activerooms', (req, res) => {
  console.log('get request response => usersCountByRoom => ', usersCountByRoom);
  res.status(200).json(usersCountByRoom);
});

// Oxford Dictionaries API
const APPID = process.env.APIID;
const APPKEY = process.env.APIKEY;
const language = 'en-us';
let wordId;
// const fields = 'definitions';
const strictMatch = 'false';

app.post('/dictionary', authController.verifyJWT, (req, res, next) => {
  // let definition = 'Sorry, we cannot find this word';
  // console.log('backend request:', req.body);
  wordId = req.body.body.vocab;
  console.log('wordId', wordId);

  const options = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: `/api/v2/entries/${language}/${wordId.toLowerCase()}?fields=definitions&strictMatch=${strictMatch}`,
    method: 'GET',
    headers: {
      app_id: process.env.APIID,
      app_key: process.env.APIKEY,
    },
  };

  https.get(options, resp => {
    // console.log('in https get request');
    let body = '';
    resp.on('data', d => {
      // console.log('d',d);
      body += d;
    });
    resp.on('end', () => {
      try {
        const data = JSON.parse(body);
        // console.log('end data',
        // data);
        if (data.error) {
          return res.status(200).json(data.error);
        }
        // console.log('inside the try',definition);
        // console.log('here the array',data.results[0].lexicalEntries);
        const dictionaryResults = { definition: data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0], partOfSpeech: data.results[0].lexicalEntries[0].lexicalCategory['id'] };
        console.log(dictionaryResults);
        return res.status(200).json(dictionaryResults);
      } catch (err) {
        return next({
          message: { err: 'An error occurred while searching for this word' },
        })
      }
    });
  });
})


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

/**
 * configure express global error handler
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 200,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// Display for rooms;
const usersCountByRoom = [
  { roomName: 'English', userCount: 0 },
  { roomName: 'French', userCount: 0 },
  { roomName: 'Spanish', userCount: 0 },
  { roomName: 'German', userCount: 0 },
];

// usersCountByRoom Helper functions
const incrementCount = roomName => {
  usersCountByRoom.forEach(room => {
    if (room.roomName === roomName) room.userCount++;
  });
};

const decrementCount = roomName => {
  usersCountByRoom.forEach(room => {
    if (room.roomName === roomName) room.userCount--;
  });
};

const checkActiveRoom = (roomName, status) => {
  return status === 'connect'
    ? incrementCount(roomName)
    : decrementCount(roomName);
};

/**
 * setup socket
 */
const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', socket => {
  console.log('socket.id => ', socket.id);
  const { name, room } = socket.handshake.query;

  console.log('before joining room => socket.rooms => ', socket.rooms);
  socket.join(room);
  console.log('After joining room => ', socket.rooms);

  checkActiveRoom(room, 'connect');
  console.log('on connect usersCountByRoom => ', usersCountByRoom);

  socket.emit('message', {
    id: socket.id,
    name: 'Admin',
    room,
    text: `${name}, welcome to ${room} chatroom.`,
  });

  socket.to(room).emit('message', {
    id: socket.id,
    name: 'Admin',
    room,
    text: `${name} has joined!`,
  });

  socket.on('sendNewMessage', message => {
    io.in(room).emit('message', message);
  });

  socket.on('sendTypingMsg', data => {
    // console.log('data-->', data);
    socket.to(room).emit('sendTypingMsg', data);
    //socket.broadcast.to().emit has the same effect!!!
  });

  socket.on('disconnect', () => {
    socket.leave(room);

    checkActiveRoom(room, 'disconnect');
    console.log('on disconnect usersCountByRoom => ', usersCountByRoom);

    socket.to(room).emit('message', {
      id: socket.id,
      name: 'Admin',
      room,
      text: `${name} has left!`,
    });
    console.log(name, ' has left ', room, ' chatroom!');
  });
});

module.exports = app;
