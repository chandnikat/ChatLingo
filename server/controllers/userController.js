const db = require('../models/chationaryModel');
const bcrypt = require('bcrypt');

const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('req.body', req.body);
  let registration_date = new Date().toString().slice(0, 15);
  let email = 'email3@email.com'
  const { user_name, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await (bcrypt.hash(password, saltRounds));
  console.log('hashedPassword => ', hashedPassword);

  const createUserQueryString = `
         INSERT INTO "public"."Users" VALUES (
           uuid_generate_v4(),
           '${user_name}', 
           '${hashedPassword}',
           '${email}', 
           '${registration_date}'
           ) RETURNING *;`;

  db.query(createUserQueryString)
    .then(response => {
      const { id, user_name } = response.rows[0];
      res.locals.user = { id, user_name };
      return next();
    })
    .catch(err => {
      console.log('Error caught in userController.createUser', err);
    })
}
// userController.createUser = async (req, res, next) => {
//   try {
//     console.log('req.body => ', req.body);
//     const { username, password } = req.body;
//     if (!username || !password) return res.sendStatus(401);

//     const saltRounds = 10;

//     console.log('hashedPassword => ', hashedPassword);

//     const text = `
//       INSERT INTO profiles (username, passkey) 
//       VALUES ($1, $2) 
//       RETURNING *
//     ;`;
//     const values = [username, hashedPassword];

//     const data = await db.query(text, values);
//     console.log('data.rows[0] => ', data.rows[0]);

//     return next();
//   } catch (err) {
//     return next({
//       log: `userController: Unable to add user data with createUser`,
//       message: {
//         err: `userController.createUser: ERROR: ${err}`,
//       },
//     });
//   }
// };

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = async (req, res, next) => {
  console.log('req.body => ', req.body);
  const { username, password } = req.body;

  if (!username || !password) return res.sendStatus(401);
  const verifyUserString = `
        SELECT *
        from "public"."Users" 
        WHERE user_name = '${username}'
      ;`;

  db.query(verifyUserString)
    .then(response => {
      console.log(response);
    })
}

// try {
//   const verifyUserString = `
//       SELECT *
//       from "public"."Users" 
//       WHERE user_name = '${username}'
//     ;`;
//   const values = [username];

// const data = await db.query(text, values);
// console.log('data.rows[0] => ', data.rows[0]);

// if (!data.rows[0]) return res.sendStatus(401);

// const hashedPassword = data.rows[0].passkey;
// console.log('hashedPassword => ', hashedPassword);

// if (!hashedPassword) return res.sendStatus(401);
// const isMatch = await bcrypt.compare(password, hashedPassword);
// console.log('isMatch => ', isMatch);
// if (!isMatch) return res.sendStatus(401);

//   return next();
// } catch (err) {
//   return next({
//     log: `userController: Unable to verify user data with verifyUser`,
//     message: {
//       err: `userController.verifyUser: ERROR: ${err}`,
//     },
//   });
// }
// };

userController.checkUsername = async (req, res, next) => {
  console.log('req.body => ', req.body);
  const { username } = req.body;

  if (!username) return res.sendStatus(401);

  try {
    const text = `
        SELECT *
        from profiles
        WHERE profiles.username = $1
      ;`;
    const values = [username];

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
