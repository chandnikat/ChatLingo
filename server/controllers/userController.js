const db = require('../models/chationaryModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('req.body', req.body);
  let registration_date = new Date().toString().slice(0, 15);
  // Email will come from req.body once updated in front end 
  let email = "hello@email.com"
  const { user_name, password } = req.body;
  // Where do we want to handle form control, i.e. if user does not fill out username and/or password field? Front end using a library such as react hook form? Back end by sending a message
  if (!user_name) return next({
    message: { err: 'Please complete username field' }
  })
  if (!password) return next({
    message: { err: 'Please complete password field' }
  })
  if (!email) return next({
    message: { err: 'Please complete email field' }
  })
  const saltRounds = 10;
  const hashedPassword = await (bcrypt.hash(password, saltRounds));
  console.log('hashedPassword => ', hashedPassword);

  const createUserQueryString = `
         INSERT INTO "public"."Users" VALUES (
           uuid_generate_v4(),
           '${user_name}', 
           '${hashedPassword}',
           '${registration_date}',
           '${email}'
           ) RETURNING *;`;

  db.query(createUserQueryString)
    .then(response => {
      const { id, user_name } = response.rows[0];
      res.locals.user = { id, user_name };
      return next();
    })
    .catch(err => {
      console.log('Error caught in userController.createUser', err);
      if (err.constraint === 'Users_user_name_key') {
        return next({
          message: { err: 'Username already exists' },
        })
      }
      else if (err.constraint === 'Users_email_key') {
        return next({
          message: { err: 'Email already exists' },
        })
      }
      else {
        return next(err);
      }
    })
}

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  console.log('req.body => ', req.body);
  const { user_name, password } = req.body;
  const verifyUserString = `
        SELECT *
        from "public"."Users" 
        WHERE user_name = '${user_name}'
      ;`;

  db.query(verifyUserString)
    .then(async response => {
      console.log(response);
      if (!response.rows[0]) {
        return next({
          message: { err: 'Username and/or password do not match' },
        })
      }
      const hashedPassword = response.rows[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) {
        const { id, user_name } = response.rows[0];
        res.locals.user = { id, user_name };
        return next();
      } else {
        return next({
          message: { err: 'Username and/or password do not match' },
        })
      }
    })
    .catch((err) => {
      return next({
        log: `userController: Unable to verify user data with verifyUser`,
        message: {
          err: `userController.verifyUser: ERROR: ${err}`,
        },
      });
    })
}


userController.checkUsername = async (req, res, next) => {
  console.log('req.body => ', req.body);
  const { user_name } = req.body;
  const checkUserString = `
        SELECT *
        from "public"."Users"
        WHERE user_name = '${user_name}'
      ;`;

  db.query(checkUserString)
    .then(response => {
      res.locals.nameExists = response.rows[0] ? true : false;
      return next();
    })
    .catch(err => {
      return next({
        log: `userController: Unable to verify user data with verifyUser`,
        message: {
          err: `userController.verifyUser: ERROR: ${err}`,
        },
      });
    })
};

module.exports = userController;
