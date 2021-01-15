const db = require('../models/chationaryModel');

const historyController = {};

historyController.getAllDefinitions = (req, res, next) => {
  const user_id = res.locals.user_id;
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

historyController.saveDefinition = (req, res, next) => {
  const { word, definition, partOfSpeech } = req.body;
  const user_id = res.locals.user_id;

  const createDefinitionQuery = `
  INSERT INTO "public"."SavedDefinitions" (word, definition, part_of_speech, user_id)VALUES (
    $1,$2,$3,$4) RETURNING * ;`;

  const values = [word, definition, partOfSpeech, user_id];
  db.query(createDefinitionQuery, values)
    .then(data => {
      return next();
    })
    .catch(err => {
      return next({
        message: { err: 'Error adding definition to database' },
      });
    });
};

historyController.deleteDefinition = (req, res, next) => {};

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

};

historyController.saveConversation = (req, res, next) => {

};

historyController.deleteConversation = (req, res, next) => {

};

module.exports = historyController;
