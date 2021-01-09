const db = require('../models/chationaryModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    console.log('req.body => ', req.body);
    const { user_name, password } = req.body;
    if (!user_name || !password) return res.sendStatus(401);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('hashedPassword => ', hashedPassword);

    const text = `
      INSERT INTO profiles (username, passkey) 
      VALUES ($1, $2) 
      RETURNING *
    ;`;
    const values = [user_name, hashedPassword];

    const data = await db.query(text, values);
    console.log('data.rows[0] => ', data.rows[0]);

    return next();
  } catch (err) {
    return next({
      log: `userController: Unable to add user data with createUser`,
      message: {
        err: `userController.createUser: ERROR: ${err}`,
      },
    });
  }
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = async (req, res, next) => {
  console.log('req.body => ', req.body);
  const { user_name, password } = req.body;

  if (!user_name || !password) return res.sendStatus(401);

  try {
    const text = `
        SELECT *
        from profiles
        WHERE profiles.username = $1
      ;`;
    const values = [user_name];

    const data = await db.query(text, values);
    console.log('data.rows[0] => ', data.rows[0]);

    if (!data.rows[0]) return res.sendStatus(401);

    const hashedPassword = data.rows[0].passkey;
    console.log('hashedPassword => ', hashedPassword);

    if (!hashedPassword) return res.sendStatus(401);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log('isMatch => ', isMatch);
    if (!isMatch) return res.sendStatus(401);

    return next();
  } catch (err) {
    return next({
      log: `userController: Unable to verify user data with verifyUser`,
      message: {
        err: `userController.verifyUser: ERROR: ${err}`,
      },
    });
  }
};

userController.checkUsername = async (req, res, next) => {
  console.log('req.body => ', req.body);
  const { user_name } = req.body;

  if (!user_name) return res.sendStatus(401);

  try {
    const text = `
        SELECT *
        from profiles
        WHERE profiles.username = $1
      ;`;
    const values = [user_name];

    const data = await db.query(text, values);
    console.log('data.rows[0] => ', data.rows[0]);

    res.locals.nameExists = data.rows[0] ? true : false;
    return next();
  } catch (err) {
    return next({
      log: `userController: Unable to verify user data with verifyUser`,
      message: {
        err: `userController.verifyUser: ERROR: ${err}`,
      },
    });
  }
};

module.exports = userController;
