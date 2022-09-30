'use strict';
module.exports = function (err, req, res, next) {
  const error = err.message ? err.message : err;
  const errorObject = {
    status: 500,
    message: error,
    route: req.path,
    query: req.query,
    body: req.body,
  };
  res.status(500).json(errorObject);
};
