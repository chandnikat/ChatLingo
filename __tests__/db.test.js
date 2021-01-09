const db = require('../server/models/chationaryModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const userController = require('../server/controllers/userController');

require('dotenv').config();


/**
 * Like many testing frameworks, in Jest we use the "describe" function to
 * separate our tests into sections. They make your test outputs readable.
 *
 * You can place "beforeAll", "beforeEach", "afterAll", and "afterEach"
 * functions inside of "describe" blocks and they will only run for tests
 * inside that describe block. You can even nest describes within describes!
 */
describe('database unit tests', () => {
  /**
   * Jest runs the "beforeAll" function once, before any tests are executed.
   * Here, we write to the file and then reset our database model. Then, we
   * invoke the "done" callback to tell Jest our async operations have
   * completed. This way, the tests won't start until the "database" has been
   * reset to an empty Array!
   */
  beforeAll((done) => {
    const createScript = fs.readFileSync(path.resolve(__dirname, '../server/models/chat_create_script.sql')).toString();
    db.query(createScript)
      .then(results => {
        console.log('Ran sql create script');
        console.log(results);
    })
      .catch(error => {
        console.log(error);
      })
  });

  afterAll((done) => {
    const dropScript = fs.readFileSync(path.resolve(__dirname, '../server/models/chat_drop_script.sql')).toString();
    db.query(dropScript)
      .then(results => {
        console.log('Ran sql create script');
        console.log(results);
    })
      .catch(error => {
        console.log(error);
      })
  });

  describe('', () => {

    it('successfully runs INSERT query to "profiles" table', async () => {
      const username = 'testUser'
      const password = 'testPassword'
      
      const inserUserQuery = `
      INSERT INTO profiles (username, passkey) 
      VALUES ($1, $2) 
      RETURNING *
      ;`;
      const values = [username, password];
      const InsertQueryRes = await db.query(inserUserQuery, values);
      expect(InsertQueryRes).not.toBeInstanceOf(Error);
    }, 30000);

    it('successfully runs SELECT query from "profiles" table', async () => {
      const username = 'testUser'
      const selectUserQuery = `
        SELECT *
        from profiles
        WHERE profiles.username = $1
      ;`;
      const values = [username];
      const selectQueryRes = await db.query(selectUserQuery, values);
      console.log(selectQueryRes);
    }, 30000);

    // TODO: Finish unit testing the sync function

    xit('overwrites previously existing markets', () => {
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0}];
      //we have markets in db
      db.sync(marketList);
      //get markets in db
      const marketsBefore = JSON.parse(fs.readFileSync(testJsonFile));
      //overwrite previously existing markets
      const newMarketList = [{ location: 'test', cards: 11 }]
      //get again from db
      db.sync(newMarketList);
      //check that the markets have been overridden
      const marketsAfter = JSON.parse(fs.readFileSync(testJsonFile));

      expect(marketsAfter).toHaveLength(1);
      expect(marketsAfter[0].location).toEqual('test');
    });

    xit('returns an error when location and/or cards fields are not provided', () => {
      const locationErr = [{ location: 'location'}];
      const cardErr = [{cards: 0}];
      const none = [{}];
      const result1 = db.sync(locationErr);
      const result2 = db.sync(cardErr);
      const result3 = db.sync(none);
      expect(result1).toBeInstanceOf(Error);
      expect(result2).toBeInstanceOf(Error);
      expect(result3).toBeInstanceOf(Error);
    });

    /**
     *  TODO: Type validation is not yet correctly implemented! Follow the TDD
     *  (test driven development) approach:
     *    1. Write a test describing the desired feature (db.sync returns a
     *      TypeError when the types are wrong)
     *    2. Confirm that your tests fail
     *    3. Follow the errors to implement your new functionality
     */
    xit('returns an error when location value is not a string', () => {
      const test = [{location: 1, cards: 0}]
      const test2 = [{ location: 'test', cards: 11 }, {location: 1, cards: 0}]
      const returned = db.sync(test); 
      const returned2 = db.sync(test2); 
      expect(returned).toBeInstanceOf(TypeError);
      expect(returned2).toBeInstanceOf(TypeError);
    });

    xit('returns an error when cards value is not a number', () => {
      const test = [{location: 'string', cards: '0'}]
      const test2 = [{ location: 'test', cards: 11 }, {location: 'string', cards: '0'}]
      const returned = db.sync(test); 
      const returned2 = db.sync(test2); 
      expect(returned).toBeInstanceOf(TypeError);
      expect(returned2).toBeInstanceOf(TypeError);
    });
  });

  // Extension TODO: Unit test the #find and #drop functions
  xdescribe('#find', () => {
    xit('works if the list of markets is empty', () => {
      const localFile = JSON.parse(fs.readFileSync(testJsonFile));
      const findResults = db.find();
      expect(localFile).toEqual([])
      expect(localFile).toEqual(findResults);
    });

    xit('returns list of all markets from the json file', () => {
      //read file and store
      const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0}];
      db.sync(marketList);
      const localFile = JSON.parse(fs.readFileSync(testJsonFile));
      const findResults = db.find();
      expect(localFile).toEqual(findResults);
    });
  });

  xdescribe('#drop', () => {
    xit('writes an empty array to the json file', () => {
      db.write([{location: 'string', cards: 0}])
      const beforeFile = JSON.parse(fs.readFileSync(testJsonFile));
      expect(beforeFile).toHaveLength(1);
      db.drop();
      const afterFile = JSON.parse(fs.readFileSync(testJsonFile));
      expect(afterFile).toHaveLength(0);
    });
  });
});
