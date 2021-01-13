const db = require('../models/chationaryModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
authController.verifyUser = (req, res, next) => {
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
        });
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
        });
      }
    })
    .catch(err => {
      return next({
        log: `authController: Unable to verify user data with verifyUser`,
        message: {
          err: `authController.verifyUser: ERROR: ${err}`,
        },
      });
    });
};

authController.generateJWT = (req, res, next) => {
  let token = jwt.sign({ id: res.locals.user.id }, process.env.JWT_SECRET, {
    expiresIn: 600, // 10 minutes
  });
  console.log('jwt', token);
  res.locals.token = token;
  return next();
}

authController.verifyJWT = (req, res, next) => {
  console.log(req.headers);
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log('token', token);

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      message: { err: 'No token provided!' },
    });
  }
  console.log('token in verifyToken ->', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: { err: 'Unauthorized!' },
      });
    }
    console.log('decoded.id in jwt.verify is: ', decoded.id);
    res.locals.user_id = decoded.id;
    return next();
  });
};



module.exports = authController;