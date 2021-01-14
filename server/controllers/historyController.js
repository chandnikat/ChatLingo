const db = require('../models/chationaryModel');

const historyController = {};

// const word = {
//   word:'apple',
//   definition: 'a fruit',
//   partOfSpeech:'noun'
// }

// CREATE TABLE "SavedTranslations" (
// 	"word" varchar(255) NOT NULL,
// 	"language_to" varchar(255) NOT NULL,
// 	"language_from" varchar(255) NOT NULL,
// 	"translation" varchar(255) NOT NULL,
// 	"user_id" uuid NOT NULL
// ) WITH (
//   OIDS=FALSE
// );


// CREATE TABLE "SavedDefinitions" (
// 	"word" varchar(255) NOT NULL,
// 	"defintion" varchar(255) NOT NULL,
// 	"part_of_speech" varchar(255) NOT NULL,
// 	"user_id" uuid NOT NULL
// ) WITH (
//   OIDS=FALSE
// );

historyController.saveDefinitions = (req, res, next) => {
  // const classes = useStyles();
  // const [vocab, setVocab] = useState('');
  // const [search, setSearch] = useState('');
  // const [definition, setDefinition] = useState(null);
  // const [partOfSpeech, setPartOfSpeech] = useState(null)
  // let [word, setWord] = useState('');
  const {word, definition, partOfSpeech} = req.body;
  const {username} = req.params;
  console.log('in saveDefinitions',{username,word, definition,partOfSpeech});
  // put into query

  // const createUserQueryString = `
  //        INSERT INTO "public"."Users" VALUES (
  //          uuid_generate_v4(),
  //          '${user_name}', 
  //          '${hashedPassword}',
  //          '${registration_date}',
  //          '${email}'
  //          ) RETURNING *;`;
           
const createDefinitionQuery = `
  INSERT INTO "public"."SavedDefinitions" (word, definition, part_of_speech)VALUES (
    $1,$2,$3)  WHERE user_name === username  RETURNING * ;`;
    const values = [word, definition, partOfSpeech];

}

historyController.deleteDefinitions = (req, res, next) => {


}

historyController.saveConversation = (req, res, next) => {


}

historyController.deleteConversation = (req, res, next) => {


}

module.exports = historyController;