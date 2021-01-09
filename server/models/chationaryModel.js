const { Pool } = require('pg');


const PG_URI = (process.env.NODE_ENV === 'testing') 
  ? `${process.env.TEST_DATABASE_URL}`
  : `${process.env.DATABASE_URL}`;
 
const pool = new Pool({
  connectionString: PG_URI,
});

// console.log('pool in db is -> ', pool);

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};


