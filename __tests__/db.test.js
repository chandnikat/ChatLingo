const db = require('../server/models/chationaryModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const userController = require('../server/controllers/userController');

require('dotenv').config();
jest.setTimeout(10000);

beforeAll((done) => {
  const createScript = fs.readFileSync(path.resolve(__dirname, '../server/models/chat_create_script.sql')).toString();
  db.query(createScript)
    .then(results => {
      debugger;
      done();
  })
    .catch(error => {
      console.log(error);
      done();

    })
});



describe('database unit tests', () => {

    it('successfully runs INSERT query to "Users" table', async (done) => {
      const username = 'testUser'
      const password = 'testPassword'
      const registrationDate = (new Date().toLocaleDateString()).slice(0,10);
      const email = 'testEmail@test.com'
      
      const inserUserQuery = `
      INSERT INTO "public"."Users" (user_name, password, registration_date, email) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
      ;`;
      const values = [username, password, registrationDate, email];
      const InsertQueryRes = await db.query(inserUserQuery, values);
      expect(InsertQueryRes).not.toBeInstanceOf(Error);
      return done();

    });

    it('successfully runs SELECT query from "Users" table', async (done) => {
      const username = 'testUser'
      const selectUserQuery = `
        SELECT *
        FROM "public"."Users"
        WHERE user_name = $1
      ;`;
      const values = [username];
      const selectQueryRes = await db.query(selectUserQuery, values);
      expect(selectQueryRes.rows[0].user_name).toEqual(username);
      return done();
    });
});

afterAll((done) => {
  const dropScript = fs.readFileSync(path.resolve(__dirname, '../server/models/chat_drop_script.sql')).toString();
  db.query(dropScript)
    .then(results => {
      db.pool.end().then(() => console.log('pool has ended'))

      done();

    })
    .catch(error => {
      console.log(error);
      db.pool.end().then(() => console.log('pool has ended'))

      done();

    });
  
});