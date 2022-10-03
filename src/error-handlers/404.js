'use strict';

module.exports = (req, res, next) => {
  const errorObject = {
    error: 404,
    route: req.originalUrl,
    message: 'Not Found - We could not find what you were looking for',
  };
  res.status(404).send(errorObject);
};
