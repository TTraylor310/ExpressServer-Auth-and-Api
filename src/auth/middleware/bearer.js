'use strict';

const { users } = require('../../models/index');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send('Invalid Login');
    }
    const token = req.headers.authorization.split(' ')[1];
    const validUser = await users.authenticateBearer(token);
    if (validUser) {
      req.user = validUser;
      req.token = validUser.token;
      next();
    }
  } catch (e) {
    console.error('Error in bearer.js:', e.message);
    next('Invalid Login');
  }
};
