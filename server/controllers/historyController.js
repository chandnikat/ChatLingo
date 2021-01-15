const db = require('../models/chationaryModel');

const historyController = {};

historyController.getAllDefinitions = (req, res, next) => {
  const user_id = res.locals.user_id;
  console.log('user id from getAllDefinitions', user_id);
  const retrieveDefinitionsQuery = `SELECT word,definition,part_of_speech FROM "public"."SavedDefinitions" WHERE user_id = '${user_id}';`;
  db.query(retrieveDefinitionsQuery)
    .then(data => {
      console.log('retrieved from db', data);
      res.locals.definitions = data.rows;
      return next();
    })
    .catch(err => {
      console.log('err in retrieval', err);
      return next(err);
    });
};

historyController.getAllTranslations = (req, res, next) => {
  const user_id = res.locals.user_id;
  console.log('user id from getAllDefinitions', user_id);
  const retrieveTranslationsQuery = `SELECT word,language_to,language_from, translation FROM "public"."SavedTranslations" WHERE user_id = '${user_id}';`;
  db.query(retrieveTranslationsQuery)
    .then(data => {
      console.log('retrieved from db', data);
      res.locals.translations = data.rows;
      return next();
    })
    .catch(err => {
      console.log('err in retrieval of translations', err);
      return next(err);
    });
};

historyController.saveDefinition = (req, res, next) => {
  const { word, definition, partOfSpeech } = req.body;
  console.log('res.locals logged', res.locals);
  const user_id = res.locals.user_id;
  console.log('in saveDefinitions', {
    user_id,
    word,
    definition,
    partOfSpeech,
  });

  const createDefinitionQuery = `
  INSERT INTO "public"."SavedDefinitions" (word, definition, part_of_speech, user_id)VALUES (
    $1,$2,$3,$4) RETURNING * ;`;

  const values = [word, definition, partOfSpeech, user_id];
  db.query(createDefinitionQuery, values)
    .then(data => {
      console.log('inserted into db', data);
      return next();
    })
    .catch(err => {
      console.log('err in insertion', err);
      return next(err);
    });
};

historyController.deleteDefinition = (req, res, next) => {};

historyController.saveTranslation = (req, res, next) => {
  const { vocab, sl, tl, translation } = req.body;
  console.log(req.body);
  const user_id = res.locals.user_id;

  const createTranslationQuery = `
  INSERT INTO "public"."SavedTranslations" (word, language_to, language_from, translation,user_id)VALUES (
    $1,$2,$3,$4,$5) RETURNING * ;`;

  const values = [vocab, sl, tl, translation, user_id];

  db.query(createTranslationQuery, values)
    .then(data => {
      console.log('inserted into db', data);
      return next();
    })
    .catch(err => {
      console.log('err in insertion', err);
      return next(err);
    });
};

historyController.deleteTranslation = (req, res, next) => {};

historyController.saveConversation = (req, res, next) => {};

historyController.deleteConversation = (req, res, next) => {};

module.exports = historyController;
