const db = require('../models/chationaryModel');

const historyController = {};


//definitons 
historyController.getAllDefinitions = (req, res, next) => {
  const user_id = res.locals.user_id;
  console.log('user id', user_id);
  const retrieveDefinitionsQuery = `SELECT word,definition,part_of_speech FROM "public"."SavedDefinitions" WHERE user_id = '${user_id}';`;
  db.query(retrieveDefinitionsQuery)
    .then(data => {
      res.locals.definitions = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error getting saved definitions from database' },
      });
    });
};

historyController.saveDefinition = (req, res, next) => {
  const { word, definition, partOfSpeech } = req.body;
  const user_id = res.locals.user_id;
  console.log('user_id', user_id);

  const createDefinitionQuery = `
  INSERT INTO "public"."SavedDefinitions" (word, definition, part_of_speech, user_id)VALUES (
    $1,$2,$3,$4) RETURNING * ;`;

  const values = [word.toLowerCase(), definition, partOfSpeech, user_id];
  db.query(createDefinitionQuery, values)
    .then(data => {
      return next();
    })
    .catch(err => {
      console.log('error in createDefinition', err);
      if (err.constraint === 'SavedDefinitions_word_key') {
        return next({
          message: { err: 'This word has already been saved to the database' },
        });
      }
      return next({
        message: { err: 'Error adding definition to database' },
      });
    });
};

historyController.deleteDefinition = (req, res, next) => {
  const user_id = res.locals.user_id;
  console.log(user_id);
  console.log('req.body', req.body);
  const { word } = req.body;
  console.log('word', word);

  const deleteDefinitionQuery = `DELETE FROM "public"."SavedDefinitions" WHERE user_id = '${user_id}' AND word = '${word.toLowerCase()}' RETURNING *;`;

  db.query(deleteDefinitionQuery)
    .then(data => {
      console.log(data);
      if (data.rows[0]) return next();
      else {
        return next({
          message: { err: 'Word does not exist in database' },
        })
      }
    })
    .catch(err => {
      return next({
        message: { err: 'Error deleting definition from database' },
      });
    })
};


//translations
historyController.getAllTranslations = (req, res, next) => {
  const user_id = res.locals.user_id;
  const retrieveTranslationsQuery = `SELECT word,language_to,language_from, translation FROM "public"."SavedTranslations" WHERE user_id = '${user_id}';`;
  db.query(retrieveTranslationsQuery)
    .then(data => {
      res.locals.translations = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error getting saved translations from database' },
      });
    });
};


historyController.saveTranslation = (req, res, next) => {
  const { vocab, tl, sl, translation } = req.body;
  const user_id = res.locals.user_id;

  const createTranslationQuery = `
  INSERT INTO "public"."SavedTranslations" (word, language_to, language_from, translation,user_id)VALUES (
    $1,$2,$3,$4,$5) RETURNING * ;`;

  const values = [vocab, tl, sl, translation, user_id];

  db.query(createTranslationQuery, values)
    .then(data => {
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error adding translation to database' },
      });
    });
};

historyController.deleteTranslation = (req, res, next) => {
  const user_id = res.locals.user_id;
  console.log(user_id);
  console.log('req.body', req.body);
  const { word,language_to,language_from } = req.body;
  
  const deleteTranslationQuery = `DELETE FROM "public"."SavedTranslations" WHERE user_id = '${user_id}' AND word = '${word}' AND language_to='${language_to}' AND language_from='${language_from}'
  RETURNING *;`;

  db.query(deleteTranslationQuery)
    .then(data => {
      console.log(data.rows);
      if (data.rows[0]) return next();
      else {
        return next({
          message: { err: 'Word does not exist in database' },
        })
      }
    })
    .catch(err => {
      return next({
        message: { err: 'Error deleting translation from database' },
      });
    })
};

//conversations
historyController.getAllConversations = (req, res, next) => {
  const user_id = res.locals.user_id;
  const retrieveConversationsQuery = `SELECT messages, participants, language FROM "public"."SavedConversations" WHERE user_id = '${user_id}';`;
  db.query(retrieveConversationsQuery)
    .then(data => {
      // console.log('hey');
      // const jsonData = JSON.parse(data);
      // console.log('json data', jsonData);
      res.locals.conversations = data.rows;
      console.log('res.locals', res.locals.conversations)
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error getting saved conversations from database' },
      });
    });
};

historyController.saveConversation = (req, res, next) => {
  const user_id = res.locals.user_id;
  const conversation = req.body;

  console.log('conversation in saveConversation', conversation);

  // const dummyData = [{
  //   id: 'jsdfkjdsf',
  //   name: 'Admin',
  //   room: 'English',
  //   text: 'Welcome to English chatroom'
  // },
  // {
  //   id: 'jsdfkjdsf',
  //   name: 'Logan',
  //   room: 'English',
  //   text: 'Hi'
  // },
  // {
  //   id: 'jsdfkjdsf',
  //   name: 'Anika',
  //   room: 'English',
  //   text: 'Hello'
  // },
  // {
  //   id: 'jsdfkjdsf',
  //   name: 'Trevor',
  //   room: 'English',
  //   text: 'Hey!'
  // },
  // {
  //   id: 'jsdfkjdsf',
  //   name: 'Anika',
  //   room: 'English',
  //   text: 'How are you?'
  // },
  // {
  //   id: 'jsdfkjdsf',
  //   name: 'Logan',
  //   room: 'English',
  //   text: 'Great'
  // },
  // {
  //   id: 'jsdfkjdsf',
  //   name: 'Trevor',
  //   room: 'English',
  //   text: 'Same here'
  // },
  // ]

  const messages = [];
  const participantsSet = new Set();
  const language = dummyData[0].room
  let chatroom_id;

  if (language === 'English') chatroom_id = 1;
  else if (language === 'French') chatroom_id = 2;
  else if (language === 'Spanish') chatroom_id = 3;
  else if (language === 'German') chatroom_id = 4;


  conversation.forEach(message => {
    messages.push({
      message: message.text,
      author: message.name
    })
    if (message.name !== 'Admin') participantsSet.add(message.name);
  })
  const participantsArray = Array.from(participantsSet);

  const createConversationQuery = `INSERT INTO "public"."SavedConversations" (chatroom_id, messages, participants, language ,user_id)VALUES (
    $1,$2,$3,$4,$5) RETURNING * ;`;

  const values = [chatroom_id, messages, participantsArray, language, user_id];

  db.query(createConversationQuery, values)
    .then(data => {
      console.log(data);
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error adding conversation to database' },
      });
    })
}


historyController.deleteConversation = (req, res, next) => {
  const deleteConversationsQuery = `DELETE from "public"."savedConversations" WHERE messages AND participants AND language;`;
  db.query(deleteConversationsQuery)
    .then(data => {
      
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error getting saved conversations from database' },
      });
    });
};


module.exports = historyController;
