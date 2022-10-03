'use strict';

module.exports = (err, req, res, next) => {
  const errorObject = {
    error: 500,
    route: req.originalUrl,
    query: req.query,
    body: req.body,
    message: err.message ? err.message : err,
  };
  res.status(500).send(errorObject);
};
