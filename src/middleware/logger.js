'use strict';

module.exports = (req, res, next) => {
  console.log(`From Logger - Request method: ${req.method}, Request path: ${req.originalUrl}`);
  next();
};
