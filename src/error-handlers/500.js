'use strict';

function handle500(err, req, res, next) {
  const error = err.message ? err.message : err;
  const errorObject = {
    status: 500,
    route: req.originalUrl,
    query: req.query,
    body: req.body,
    message: error,
  };
  res.status(500).json(errorObject);
}

module.exports = handle500;
