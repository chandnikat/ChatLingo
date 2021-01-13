const db = require('../server/models/chationaryModel');
const path = require('path');
const fs = require('fs');

const createScript = fs.readFileSync(path.resolve(__dirname, '../server/models/chat_create_script.sql')).toString();

export default (query) => {
  db.query(createScript)
  .then(results => {
    console.log('Ran sql query script');
    console.log(results);
  })
  .catch(error => {
    console.log(error);
  })
}
